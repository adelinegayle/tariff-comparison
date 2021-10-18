const _ = require("lodash");

const BASIC = "basic electricity tariff";
const PACKAGED = "Packaged Tariff";
const PRODUCTS = "products";

const productComputation = (req, res) => (config) => {
  try {
    const { consumption } = req.query;
    const products = config.get(PRODUCTS);
    let basic, packaged;

    if (isNaN(consumption) || consumption < 0) {
      throw error;
    }

    _.forEach(products, (product) => {
      if (_.isEqual(product.name, BASIC)) {
        basic = {
          tariffName: product.name,
          annualCosts: basicElectricityTariff(product, consumption),
        };
      }
      if (_.isEqual(product.name, PACKAGED)) {
        packaged = {
          tariffName: product.name,
          annualCosts: packagedTariff(product, consumption),
        };
      }
    });

    const data = arrangeData(basic, packaged);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
  return;
};

const arrangeData = (basic, packaged) => {
  return packaged.annualCosts < basic.annualCosts
    ? { packaged, basic }
    : { basic, packaged };
};

const basicElectricityTariff = (product, consumption) => {
  const { baseCharge, consumptionCharge } = product.costs;
  return baseCharge * 12 + (consumptionCharge / 100) * consumption;
};

const packagedTariff = (product, consumption) => {
  const { baseCharge, aboveCeilingCharge, ceiling } = product.costs;
  if (consumption <= ceiling) {
    return baseCharge;
  } else {
    const difference = consumption - ceiling;
    const additionalCharge = difference * (aboveCeilingCharge / 100);
    return baseCharge + additionalCharge;
  }
};

module.exports = productComputation;
