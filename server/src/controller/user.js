const userModel = require('../model/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const moment = require('moment')


const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body

        if (Object.keys(req.body).length == 0) return res.status(400).send({ message: 'Please provide data' })

        if (!name) return res.status(400).send({ message: 'Please provide name' });
        if (!email) return res.status(400).send({ message: 'Please provide email' });
        if (!password) return res.status(400).send({ message: 'Please provide password' });
        if (!phone) return res.status(400).send({ message: 'Please provide phone' });
        if (!/^[a-zA-Z ]{2,20}$/.test(name)) return res.status(400).send({ message: 'Please provide valid name' });
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ message: 'Please provide valid email' });
        if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone)) return res.status(400).send({ message: 'Please provide valid phone' });
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password)) return res.status(400).send({ message: 'Please provide valid password' });

        const checkEmail = await userModel.findOne({ email });
        const checkPhone = await userModel.findOne({ phone });

        if (checkEmail) return res.status(400).send({ message: 'Please provide unique email' });
        if (checkPhone) return res.status(400).send({ message: 'Please provide unique phone' });

        req.body.password = await bcrypt.hash(password, 10);

        const data = await userModel.create(req.body);

        return res.status(201).send({ message: data });

    } catch (error) { return res.status(500).send({ message: error }) }
}

const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    if (Object.keys(req.body).length == 0) return res.status(400).send({ message: 'Please provide data' })

    if (!email) return res.status(400).send({ message: 'Please provide email' });
    if (!password) return res.status(400).send({ message: 'Please provide password' });
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ message: 'Please provide valid email' });

    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).send({ message: 'user not found' });

    const lastTryDay = moment(user.blockTime);
    const today = moment(moment().format());
    const hours = today.diff(lastTryDay, 'hours');
    console.log(hours , user.email ,  user.blockTime , user.attemptTime);
    // when user first time regester that this user has blockTime -> null , attempet -> 1 hours -> nan
    // when user blocked  hours greterthen of 10 hours attempt -> 5 blocktime -> last block time 
    if ((user.blockTime === null && user.attemptTime === 1 ) || (hours > 10 && user.attemptTime > 4) || (hours < 10 || !(hours === NaN) && user.attemptTime < 5)) {

        if (hours > 10 && user.attemptTime > 4) {
           
            let checkPassword = await bcrypt.compare(password, user.password);
            await userModel.findOneAndUpdate({ email }, { attemptTime: 1 , blockTime: null }, { new: true });

            if (checkPassword) {

                let token = jwt.sign({ id: user._id }, 'sourabhkumarcointabassignment');

                return res.status(200).send({ message: 'login', token ,data:user });

            } else {
                let data = await userModel.findOneAndUpdate({ email }, { $inc: { attemptTime: +1 } }, { new: true });

                return res.status(401).send({ message: `invalid password.\n after ${6 - data.attemptTime} wrong time attempt . \n you will block from 24 hours` })
            }
        } else {
            let checkPassword = await bcrypt.compare(password, user.password);

            if (checkPassword) {

                await userModel.findOneAndUpdate({ email }, { attemptTime: 1, blockTime: null  }, { new: true });

                let token = jwt.sign({ id: user._id }, 'sourabhkumarcointabassignment');

                return res.status(200).send({ message: 'login', data:user, token });

            } else {

                let data = await userModel.findOneAndUpdate({ email }, { $inc: { attemptTime: +1 } }, { new: true });

                if (data.attemptTime > 6) {
                    await userModel.findOneAndUpdate({ email }, { blockTime: moment().format() }, { new: true });

                    return res.status(401).send({ message: `you have blocked for 24 hours` });
                }
                return res.status(401).send({ message: `invalid password... you have only ${6 - data.attemptTime} left. after 5 wrong time attempt . you will block from 24 hours` })
            }
        }
    } else {

        return res.status(401).send({ message: `You have Blocked For 24 hours.` });

    }

    } catch (error) { return res.status(500).send({ message: error }) }
}

module.exports = { createUser, login };