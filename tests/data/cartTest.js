import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    // prevent test suit to modify our code:
    spyOn(localStorage, "setItem");
  });

  it("adds an exisiting product to the cart", () => {
    // mocks: calling the fake version.
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1"
      }]);
    });
    loadFromStorage();

    // Flaky test: sometimes pass or fail without changing the code
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2, 
      deliveryOptionId: "1"
    }]));
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });
  
  it("adds a new product to the cart", () => {
    // mocks: calling the fake version.
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    // Flaky test: sometimes pass or fail without changing the code
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1, 
      deliveryOptionId: "1"
    }]));
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});