from enum import Enum
from data.assets.resource import Resource


class AssetType(Enum):
    REAL_ESTATE = "real_estate"


class Asset:
    def __init__(self, type: AssetType, resources: [Resource]) -> None:
        self.type: AssetType = type
        self.resources: [Resource] = resources
