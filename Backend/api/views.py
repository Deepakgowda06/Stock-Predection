from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score


# Create your views here.


class StockPredectionAPIVIEW(APIView):

    def post(self, request):
        serializer = StockPredectionSerializer(data=request.data)

        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # Fetch data from yfinance
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now

            df = yf.download(ticker, start=start, end=end)

            if df.empty:
                return Response({
                    "error": "No data found for given ticker.",
                }, status=status.HTTP_404_NOT_FOUND)

            df = df.reset_index()

            plt.switch_backend('AGG')

            # ------------------ BASIC PLOT ------------------
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='Closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()

            basic_plot_name = f'{ticker}_basic.png'
            basic_plot_path = os.path.join(settings.MEDIA_ROOT, basic_plot_name)
            plt.savefig(basic_plot_path)
            plt.close()

            # ------------------ 100 DMA ------------------
            ma100 = df.Close.rolling(100).mean()

            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100, 'r', label='100 DMA')
            plt.title(f'Closing Price + 100 DMA of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()

            dma_plot_name = f'{ticker}_100dma.png'
            dma_plot_path = os.path.join(settings.MEDIA_ROOT, dma_plot_name)
            plt.savefig(dma_plot_path)
            plt.close()


            # ------------------ 200 DMA ------------------
            ma200 = df.Close.rolling(200).mean()

            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100, 'r', label='100 DMA')
            plt.plot(ma200, 'g', label='200 DMA')
            plt.title(f'Closing Price + 200 DMA of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()

            dma200_plot_name = f'{ticker}_200dma.png'
            dma200_plot_path = os.path.join(settings.MEDIA_ROOT, dma200_plot_name)
            plt.savefig(dma200_plot_path)
            plt.close()


            # Splitting data into Training and Testing
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.70)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.70): int(len(df))])


            #scale
            scaler = MinMaxScaler(feature_range=(0,1))


            ##Load ML model
            model=load_model('stock_prediction_model.keras')

            ## preparing Test Data

            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i, 0])

            x_test, y_test = np.array(x_test), np.array(y_test)

            ##Making prediction y_predicted = model.predict(x_test)
            y_predicted = model.predict(x_test)

            ##inverse to orginal price

            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
            

            ##plot final prediction
            plt.figure(figsize=(12, 5))
            plt.plot(y_test,'b', label='Orginal Price')
            plt.plot(y_predicted, 'r', label='Predicted Price')
            plt.title(f'Final Prediction for {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()

            final_img = f'{ticker}_final_prediction.png'
            plot_prediction = os.path.join(settings.MEDIA_ROOT, final_img)
            plt.savefig(plot_prediction)
            plt.close()


            ##Model evealution
            # Mean Squared Error (MSE)

            mse = mean_squared_error(y_test, y_predicted)

            # Root Mean Squared Error (RMSE)
            rmse = np.sqrt(mse)




            return Response({
                'status': 'success',
                'basic_plot': settings.MEDIA_URL + basic_plot_name,
                'plot_100_dma': settings.MEDIA_URL + dma_plot_name,
                'plot_200_dma': settings.MEDIA_URL + dma200_plot_name,
                'final_prediction_plot': settings.MEDIA_URL + final_img, 
                'model_evaluation': {
                    'mean_squared_error': mse,
                    'root_mean_squared_error': rmse,
                }
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
