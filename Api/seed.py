from data.assets.asset import AssetType
import data.assets.real_estate.real_estate_data_service as real_estate_data_service
import data.embedding as embedding


def seed():
    real_estate_data = real_estate_data_service.fetch()
    embedding.generate(AssetType.REAL_ESTATE, real_estate_data)


if __name__ == "__main__":
    seed()
