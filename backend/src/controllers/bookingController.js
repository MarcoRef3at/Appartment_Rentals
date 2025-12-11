const { Booking, Property, Guest } = require('../models');

const createBooking = async (req, res) => {
  try {
    const { property_id, guest_id, start_date, end_date, channel, status, total_amount, currency } = req.body;

    // Verify property exists and belongs to user (or is accessible)
    // For manual bookings created by host:
    const property = await Property.findByPk(property_id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (req.user.role !== 'admin' && property.host_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied to this property' });
    }

    // Guest handling: if guest_id provided use it, otherwise create guest?
    // For MVP simplified: expect guest_id to be provided, or maybe create one on the fly if guest info is provided.
    // Let's stick to simple: guest_id required for now or handled in a separate Guest creation step.
    // Actually, often manual booking creation includes guest details.
    // Let's allow creating a booking with an existing guest_id.

    if (!guest_id) {
       return res.status(400).json({ error: 'guest_id is required' });
    }

    const booking = await Booking.create({
      property_id,
      guest_id,
      start_date,
      end_date,
      channel: channel || 'manual',
      status: status || 'pending',
      total_amount,
      currency
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const getBookings = async (req, res) => {
  try {
    const hostId = req.user.userId;

    // Find all properties for this host
    const properties = await Property.findAll({
        where: req.user.role === 'admin' ? {} : { host_id: hostId },
        attributes: ['id']
    });

    const propertyIds = properties.map(p => p.id);

    const bookings = await Booking.findAll({
      where: {
        property_id: propertyIds
      },
      include: [
        { model: Property, as: 'property', attributes: ['title'] },
        { model: Guest, as: 'guest', attributes: ['name', 'email'] }
      ]
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const getBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id, {
            include: [
                { model: Property, as: 'property' },
                { model: Guest, as: 'guest' }
            ]
        });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Access check
        if (req.user.role !== 'admin' && booking.property.host_id !== req.user.userId) {
             return res.status(403).json({ error: 'Access denied' });
        }

        res.json(booking);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
}

module.exports = {
  createBooking,
  getBookings,
  getBooking
};
