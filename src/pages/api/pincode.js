export default function handler(req, res) {

  let pincodes = {
    "180001": ["Jammu", "J&K"],
    "721302": ["Kharagpur", "West Bengal"],
    "110003": ["Delhi", "Delhi"]
  }
    res.status(200).json(pincodes)
  }