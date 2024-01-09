"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.midtermPointsValidation = void 0;
const midtermPointsValidation = (req, res, next) => {
    const midtermData = Array.isArray(req.body) ? req.body : Array.from(req.body);
    midtermData.map((midterm) => {
        if (midterm.points_written < 0 || midterm.points_written > 26) {
            res.status(400).send({ message: `Bodovi međuispita/završnog ispita moraju biti u rasponu [0,26]. Vaš unos: ${midterm.points_written}. ID ispita: ${midterm.midtermId}` });
        }
        if (midterm.MidtermType === 'ZI') {
            if (midterm.points_oral < 0 || midterm.points_oral > 24) {
                res.status(400).send({ message: `Bodovi usmenog dijela ispita moraju biti u rasponu [0,24]. Vaš unos: ${midterm.points_oral}. ID ispita: ${midterm.midtermId}` });
            }
        }
    });
    next();
};
exports.midtermPointsValidation = midtermPointsValidation;
