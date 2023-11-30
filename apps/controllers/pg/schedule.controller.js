const schedule = require('../../models/pg/schedule');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createSchedule = async (req, res) => {
    const { id_history, date, time_start, time_end, jam } = req.body;

    try {
        const newSchedule = new schedule({
            id_history,
            date,
            time_start,
            time_end,
            jam
        });
        await newSchedule.save();
        res.status(201).json(apiResponse(201, 'Success', 'Schedule Created', newSchedule));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllSchedule = async (req, res) => {
    try {
        const schedules = await schedule.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'All Schedule', schedules));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getScheduleById = async (req, res) => {
    const { id } = req.params;
    try {
        const schedules = await schedule.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Schedule', schedules));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { id_history, date, time_start, time_end, jam } = req.body;
    try {
        const schedules = await schedule.update({
            id_history,
            date,
            time_start,
            time_end,
            jam
        }, {
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Schedule Updated', schedules));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const schedules = await schedule.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Schedule Deleted', schedules));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAllSchedule = async (req, res) => {
    try {
        const schedules = await schedule.destroy({
            where: {},
            truncate: false,
        });
        res.status(200).json(apiResponse(200, 'Success', 'All Schedule Deleted', schedules));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}