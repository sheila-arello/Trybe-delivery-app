const { Op } = require('sequelize');
const { User, Product, Sale, SalesProduct } = require('../database/models');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async getAllProducts() {
    const products = await Product.findAll();
    if (!products) {
      throw new CustomError(404, 'Not found');
    }
    return products;
  },

  async getAllSellers() {
    const sellers = await User.findAll({ where: { role: 'seller' } });
    if (!sellers) {
      throw new CustomError(404, 'Not found');
    }
    // retornar apenas um array com os nomes dos vendedores
    const names = sellers.map((seller) => ({
      id: seller.id, 
      name: seller.name
    }));
    return names;
  },

  async getProductById(id) {
    // const { role, id } = await jwt.verify(token);
    // if (role === 'customer') throw new CustomError(401, 'Unauthorized - Must be a Seller');
    const product = await Product.findByPk(id);
    if (!product) {
      throw new CustomError(404, 'Not found');
    }
    return product;
  },

  async getOrdersByCustomerId(id) {
    const ordersByUserId = await Sale.findAll({ where: { userId: id } });
    
    if (!ordersByUserId) throw new CustomError(404, 'Not found');
    return ordersByUserId;
  },

  async getOrderByOrderId(_userId, id) {
    // Eagle
    // const orderById = await Sale.findOne({ 
    //   where: { id },
    //   include:
    //     [
    //       { model: User, foreignKey: 'sellerId', as: 'sellers', attributes: ['name'] },
    //       { model: Product,
    //         foreignKey: 'productId',
    //         as: 'orders',
    //         through: SalesProduct,
    //         attributes: ['name'] },
    //     ],
    // });

    // Lazy:
    const orderById = await Sale.findOne({ 
      where: { id }, 
      include: { model: User, foreignKey: 'sellerId', as: 'sellers', attributes: ['name'] },
    });

    // const products = await SalesProduct.findAll({ 
    //   where: { saleId: id },
    //   include:
    //     [{
    //       model: Product,
    //       foreignKey: 'productId',
    //       as: 'orders',
    //       through: { attributes: ['name'] },
    //     }],
    // });
    // console.log(products);
    if (!orderById) throw new CustomError(404, 'Not found');
    // verificar se a oreder pertence ao usuario do token

    return orderById;
  },

  async createSale(userId, order) {
    // const sellerId = await User.findOne({ where: 
    //   { [Op.and]: [{ role: 'seller' }, { name: order.sellerName }] } });
    // if (!sellerId) throw new CustomError(404, 'Unauthorized - Must be a Seller');

    const newOrder = {
        userId, // extrair do token
        sellerId: order.sellerId, // busca o Id pelo nome da vendedora OU recebe do front direto o id
        totalPrice: order.totalPrice, // valor calculado pelo front
        deliveryAddress: order.deliveryAddress,
        deliveryNumber: order.deliveryNumber,
        // saleDate, // data da inserção no banco
        status: 'Pendente',
      };   
    const insertedId = await Sale.create(newOrder);
    await this.bulkCreateBySale(insertedId.id, order.items);
    return insertedId;
  },
  
  async bulkCreateBySale(saleId, items) {
    const map = items.map((item) => (
      {
        saleId,
        productId: item.productId,
        quantity: item.quantity,
      }));
    await SalesProduct.bulkCreate(map);
  },
};
