# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class MovementPredictionResponse(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, predictions: object=None):  # noqa: E501
        """MovementPredictionResponse - a model defined in Swagger

        :param predictions: The predictions of this MovementPredictionResponse.  # noqa: E501
        :type predictions: object
        """
        self.swagger_types = {
            'predictions': object
        }

        self.attribute_map = {
            'predictions': 'predictions'
        }
        self._predictions = predictions

    @classmethod
    def from_dict(cls, dikt) -> 'MovementPredictionResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The MovementPredictionResponse of this MovementPredictionResponse.  # noqa: E501
        :rtype: MovementPredictionResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def predictions(self) -> object:
        """Gets the predictions of this MovementPredictionResponse.


        :return: The predictions of this MovementPredictionResponse.
        :rtype: object
        """
        return self._predictions

    @predictions.setter
    def predictions(self, predictions: object):
        """Sets the predictions of this MovementPredictionResponse.


        :param predictions: The predictions of this MovementPredictionResponse.
        :type predictions: object
        """

        self._predictions = predictions
