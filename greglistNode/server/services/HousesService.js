import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {


  async getHouses() {
    const houses = await dbContext.Houses.find()

    return houses
  }
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) {
      throw new BadRequest(`No house found with ${houseId}`)
    }
    return house
  }
  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }
  async removeHouse(houseId, userId) {
    const houseToDelete = await this.getHouseById(houseId)
    if (houseToDelete.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE OWNER OF THIS HOUSE WORTH $${houseToDelete.price}`)
    }
    await houseToDelete.remove()
  }
  async updateHouse(houseId, userId, houseData) {
    const originalHouse = await this.getHouseById(houseId)

    if (originalHouse.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE OWNER OF THIS HOUSE WORTH $${originalHouse.price}`)
    }

    originalHouse.price = houseData.price || originalHouse.price
    originalHouse.description = houseData.description || originalHouse.description
    originalHouse.bedrooms = houseData.bedrooms || originalHouse.bedrooms
    originalHouse.bathrooms = houseData.bathrooms || originalHouse.bathrooms
    originalHouse.imgUrl = houseData.imgUrl || originalHouse.imgUrl

    await originalHouse.save()

    return originalHouse
  }
}

export const housesService = new HousesService()