const { Property, Device } = require('../models');

const createProperty = async (req, res) => {
  try {
    // Assuming req.user.userId is populated by auth middleware
    const hostId = req.user.userId;
    const { title, address, timezone, default_wifi_ssid, default_wifi_password, images, amenities } = req.body;

    const property = await Property.create({
      host_id: hostId,
      title,
      address,
      timezone,
      default_wifi_ssid,
      default_wifi_password,
      images,
      amenities
    });

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create property' });
  }
};

const getProperties = async (req, res) => {
  try {
    const hostId = req.user.userId;
    // Admins might see all, but for now let's just show the user's properties
    // If we want admin to see all, we check req.user.role

    let whereClause = { host_id: hostId };
    if (req.user.role === 'admin') {
      whereClause = {};
    }

    const properties = await Property.findAll({ where: whereClause });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

const getProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id, {
      include: [{ model: Device, as: 'devices' }]
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Authorization check
    if (req.user.role !== 'admin' && property.host_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (req.user.role !== 'admin' && property.host_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await property.update(req.body);
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update property' });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (req.user.role !== 'admin' && property.host_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await property.destroy();
    res.json({ message: 'Property deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
};
