from rest_framework import serializers


class StockPredectionSerializer(serializers.Serializer):
    ticker=serializers.CharField(max_length=20)
