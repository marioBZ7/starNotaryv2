const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {

    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star',() => {

    let meta;
    let tokenId = 1;
    return StarNotary.deployed()
    .then(instance => {
        meta = instance;
        return meta.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    })
    .then(() => {
        return meta.tokenIdToStarInfo.call(tokenId);
    })
    .then(star => {
        assert.equal(star, 'Awesome Star!')
    })
});

it("lets user1 put up their star for sale", () => {

    let meta;
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    return StarNotary.deployed()
    .then(instance => {
        meta = instance;
        return meta.createStar('awesome star', starId, {from: user1})
    })
    .then(() => {
        return meta.putStarUpForSale(starId, starPrice, {from: user1})
    })
    .then(() => {
        return meta.starsForSale.call(starId)
    })
    .then(price => {
        assert.equal(price, starPrice)
    })
});

it('lets user2 buy a star, if it is put up for sale', () => {

    let meta;
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");

    return StarNotary.deployed()
    .then(instance => {
        
        meta = instance;
        return meta.createStar('awesome star', starId, {from: user1})
    })
    .then(() => {
        return meta.putStarUpForSale(starId, starPrice, {from: user1})
    })
    .then(() => {
        return meta.buyStar(starId, {from: user2, value: balance});
    })
    .then(() => {
        return meta.ownerOf.call(starId)
    })
    .then(owner => {
        assert.equal(owner, user2);
    })
});

it('lets user2 buy a star and decreases its balance in ether', () => {

    let meta;
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    let balanceOfUser1BeforeTransaction;
    let balanceOfUser2BeforeTransaction;
    return StarNotary.deployed()
    .then(instance => {
        meta = instance;
        return meta.createStar('awesome star', starId, {from: user1})
    })
    .then(() => {
        return meta.putStarUpForSale(starId, starPrice, {from: user1})
    })
    .then(() => {
        return web3.eth.getBalance(user2);
    })
    .then((balanceOfUser1BeforeTransaction_) => {
        balanceOfUser1BeforeTransaction = balanceOfUser1BeforeTransaction_;
        return web3.eth.getBalance(user2)
    })
    .then(balanceOfUser2BeforeTransaction_ => {
        balanceOfUser2BeforeTransaction = balanceOfUser2BeforeTransaction_;
        return meta.buyStar(starId, {from: user2, value: balance, gasPrice:0})
    })
    .then(() => {
        return web3.eth.getBalance(user2)
    })
    .then(balanceAfterUser2BuysStar => {
        let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
        assert.equal(value, starPrice);
    })
})
