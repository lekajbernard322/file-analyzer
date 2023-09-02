def get_dll_statistics(djongo_manager):
    result = djongo_manager.mongo_aggregate([
        {
            '$project': {
                'numberOfDlls': {
                    '$cond': {
                        'if': {
                            '$isArray': '$content'
                        },
                        'then': {
                            '$size': '$content'
                        },
                        'else': 0
                    }
                }
            }
        }, {
            '$group': {
                '_id': '_id',
                'averageNumberOfDlls': {
                    '$avg': '$numberOfDlls'
                },
                'minNumberOfDlls': {
                    '$min': '$numberOfDlls'
                },
                'maxNumberOfDlls': {
                    '$max': '$numberOfDlls'
                }
            }
        }
    ])

    return list(result)[0]


def get_function_statistics(djongo_manager):
    result = djongo_manager.mongo_aggregate([
        {
            '$unwind': {
                'path': '$content'
            }
        }, {
            '$project': {
                '_id': '$_id',
                'numberOfFunctions': {
                    '$cond': {
                        'if': {
                            '$isArray': '$content.Functions'
                        },
                        'then': {
                            '$size': '$content.Functions'
                        },
                        'else': 0
                    }
                }
            }
        }, {
            '$group': {
                '_id': '$_id',
                'totalNumberOfFunctionsPerDll': {
                    '$sum': '$numberOfFunctions'
                }
            }
        }, {
            '$group': {
                '_id': '_id',
                'averageNumberOfFunctions': {
                    '$avg': '$totalNumberOfFunctionsPerDll'
                },
                'minNumberOfFunctions': {
                    '$min': '$totalNumberOfFunctionsPerDll'
                },
                'maxNumberOfFunctions': {
                    '$max': '$totalNumberOfFunctionsPerDll'
                }
            }
        }
    ])

    return list(result)[0]


def get_dll_occurrences_count(dlls, djongo_manager):
    response = djongo_manager.mongo_aggregate([{
        '$unwind': {
            'path': '$content'
        }
    }, {
        '$project': {
            'dllName': {'$toLower': '$content.DLLName'}
        }
    }, {
        '$match': {
            'dllName': {
                '$in': dlls
            }
        }
    }, {
        '$group': {
            '_id': '$dllName',
            'occurrences': {
                '$sum': 1
            }
        }
    }, {
        '$sort': {
            '_id': 1
        }
    }])

    return list(response)
