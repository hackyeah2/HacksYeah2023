from data.assets.asset import AssetType
import data.embedding as embedding

results = embedding.search(
    AssetType.REAL_ESTATE, "ile średnio jest pokoi w mieszkaniach we wrocławiu?")
print(results)
