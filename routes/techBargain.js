const express = require("express");
const router = express.Router();
const { mostRecent } = require("../scanners/techBargain");

const catArr = [
  "computers",
  "laptops",
  "monitors",
  "pc-gaming",
  "components",
  "storage",
  "tablets",
  "software",
  "networking",
  "printers-scanners",
  "computer-accessories",
  "keyboards-mice",
  "ssd-solid-state-drives",
  "tv-home-theater",
  "smartphones",
  "gaming",
  "headphones",
  "audio-components",
  "cameras-camcorders",
  "smart-home-devices",
  "wearable-tech",
  "apple-lightning-cables",
  "power-bank",
  "home-theater-tv-accessories",
  "mobile-accessories",
  "robot-vacuum",
  "sound-bar",
  "dash-cams",
  "office-electronics",
  "vr-headsets",
  "drones",
  "projectors",
  "tools",
  "clothing-shoes",
  "home-garden",
  "appliances-kitchen",
  "automotive-car-tech",
  "sporting-goods",
  "gift-cards",
  "travel",
  "health-beauty",
  "massagers",
  "air-purifier",
  "bed-bath",
  "food-restaurants",
  "entertainment",
  "video-streaming",
  "furniture",
  "toys-and-collectibles",
  "lego",
  "tires",
  "pets",
  "free-stuff,magazines-subscriptions",
  "mattresses-beds-frames",
  "vpn",
  "web-hosting",
  "refurbished",
  "finance",
  "tax-preparation",
  "home-office",
  "emergency-preparedness",
];

const storeAlt = {
  amazon: "amazon",
  walmart: "walmart",
  bestbuy: "bestbuy",
  dell: "dell",
  "dell-tech": "dellsmallbiz",
  verizon: "verizon",
  "google-store": "google-store",
  lenovo: "lenovo",
  rakuten: "rakuten",
  "b&h": "b-and-h",
  alienware: "alienware",
  newegg: "newegg",
  apple: "apple",
  ebay: "ebay",
  "pcmag-shop": "pcmag-shop",
  hp: "hp",
  "at&t": "att-wireless",
  "t-mobile": "tmobile",
  microsoft: "microsoft",
  sprint: "sprint",
};

router.get("/", async (req, res) => {
  const data = await mostRecent(false, false);
  res.json({
    data: data,
  });
});

router.get("/categories/:category", async (req, res) => {
  const cat = req.params.category;
  let match = false;
  for (el of catArr) {
    if (cat === el) {
      const deals = await mostRecent(cat, false);
      res.json({
        deals: deals,
      });
      match = true;
      break;
    }
  }
  if (!match) {
    res.status(404);
  }
});

router.get("/store/:store", async (req, res) => {
  const store = req.params.store;
  if (storeAlt[store]) {
    const deals = await mostRecent(false, storeAlt[store]);
    res.json({
      deals: deals,
    });
  } else {
    res.status(404);
  }
});
module.exports = router;
