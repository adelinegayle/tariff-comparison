const productComputation = require("../../../app/controllers/product.controller");
const basicElectricityTariff =
  require("../../../app/controllers/product.controller").__get__(
    "basicElectricityTariff"
  );
const packagedTariff =
  require("../../../app/controllers/product.controller").__get__(
    "packagedTariff"
  );
const arrangeData =
  require("../../../app/controllers/product.controller").__get__("arrangeData");

const config = require("config");

describe("Test Product Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  test("Can compute basic electricity tariff", () => {
    const product = {
      name: "basic electricity tariff",
      costs: {
        baseCharge: 5,
        consumptionCharge: 22,
      },
    };
    expect(basicElectricityTariff(product, 3500)).toEqual(830);
    expect(basicElectricityTariff(product, 4500)).toEqual(1050);
    expect(basicElectricityTariff(product, 6000)).toEqual(1380);
  });

  test("Can compute packaged tariff", () => {
    const product = {
      name: "Packaged Tariff",
      costs: {
        baseCharge: 800,
        aboveCeilingCharge: 30,
        ceiling: 4000,
      },
    };
    expect(packagedTariff(product, 3500)).toEqual(800);
    expect(packagedTariff(product, 4500)).toEqual(950);
    expect(packagedTariff(product, 6000)).toEqual(1400);
  });

  test("Can return response with tariff computation", () => {
    const mockRequest = () => {
      return {
        method: "GET",
        query: { consumption: 3500 },
      };
    };

    const expectedData = {
      success: true,
      data: {
        basic: { tariffName: "basic electricity tariff", annualCosts: 830 },
        packaged: { tariffName: "Packaged Tariff", annualCosts: 800 },
      },
    };

    const req = mockRequest();
    const res = mockResponse();

    productComputation(req, res)(config);
    expect(productComputation).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedData);
  });

  test("Should return 500 response on error", () => {
    const mockRequest = () => {
      return {
        method: "GET",
        query: {},
      };
    };

    const expectedData = {
      success: false,
      message: "Something went wrong",
    };

    const req = mockRequest();
    const res = mockResponse();

    productComputation(req, res)(config);
    expect(productComputation).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expectedData);
  });

  test("Should return data in proper order", () => {
    const basic = { tariffName: "basic electricity tariff", annualCosts: 830 };
    const packaged = { tariffName: "Packaged Tariff", annualCosts: 800 };

    let data = arrangeData(basic, packaged);
    expect(data).toEqual({ packaged, basic });

    basic.annualCosts = 700;
    data = arrangeData(basic, packaged);
    expect(data).toEqual({ basic, packaged });
  });
});
