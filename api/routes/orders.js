const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
       message: 'Получены заказы'
   })
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Заказ создан',
        order: order
    })
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Подробности заказа',
        orderId: req.params.orderId
    })
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Заказ удалён',
        orderId: req.params.orderId
    })
});

module.exports = router;