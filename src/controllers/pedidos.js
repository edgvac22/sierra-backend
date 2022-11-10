const { response } = require('express');
const Pedido = require('../models/pedidos');

const buscarPedidos = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [pedidos, totalPedidos] = await Promise.all([
        Pedido.find().skip(desde).limit(5),
        Pedido.count()
    ])
    res.json({
        ok: true,
        pedidos,
        totalPedidos
    });
}

const buscarPedido = async (req, res = response) => {
    
    const { email } = req.body;

    const pedido = await Pedido.findOne({ email });

    if(!pedido){
        return res.status(200).json({
            ok: false,
            msg: 'No existen pedidos'
        })
    }else{
        return res.status(200).json({
            ok: true,
            pedido
        })
    }
  };

const crearPedidos = async (req, res = response) => {
    const { pedido, fecha, email, metodo_pago, metodo_envio, subtotal, itbm, flete, total, articulos  } = req.body;

    const pedidoExiste = await Pedido.findOne({ pedido });
    if (pedidoExiste) {
        return res.status(200).json({
            ok: false,
            msg: 'El pedido ya existe'
        });
    }else{
    try {

        const pedidos = new Pedido(req.body)

        pedidos.pedido = pedido;
        pedidos.fecha = fecha;
        pedidos.email = email;
        pedidos.metodo_pago = metodo_pago;
        pedidos.metodo_envio = metodo_envio;
        pedidos.subtotal = subtotal;
        pedidos.itbm = itbm;
        pedidos.flete = flete;
        pedidos.total = total;
        pedidos.articulos = articulos;

        //Guardar pedido
        const pedidonuevo = await pedidos.save();

        res.json({
            ok: true,
            pedidonuevo
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
}

module.exports = {
    crearPedidos,
    buscarPedidos,
    buscarPedido
}