const { Guest, Property } = require('../models');

const createGuest = async (req, res) => {
    try {
        const { name, email, phone, passport, country } = req.body;
        // In a real app, we might want to prevent duplicate guests by email
        const guest = await Guest.create({
            name, email, phone, passport, country
        });
        res.status(201).json(guest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create guest' });
    }
};

const getGuests = async (req, res) => {
    try {
        // Guests might be shared or scoped. For simplicity, list all or scoped to bookings of host.
        // For MVP, just return all guests if admin, or maybe just simple list for now.
        // Ideally we filter guests who have booked with this host.

        // Simplified:
        const guests = await Guest.findAll();
        res.json(guests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch guests' });
    }
};

module.exports = {
    createGuest,
    getGuests
};
