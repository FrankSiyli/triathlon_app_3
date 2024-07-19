export const examplePlan = {
  _id: {
    $oid: "64fae13efe51afbb2f421585",
  },
  category: "homepage",
  name: "Beispielplan",
  info: "Dieser Plan hilft dir....",
  wishFrom: "",
  duration: 2,
  weeks: [
    {
      week: 1,
      days: {
        Montag: [
          {
            _id: {
              $oid: "650c640a5ae23bc214766d74",
            },
            activity: "Yoga",
            description: "Flow",
            sessionParts: [
              {
                warmUp: [
                  {
                    multiplier: 1,
                    exercises: [
                      {
                        name: "",
                        distance: 0,
                        duration: 0,
                        zone: "",
                      },
                    ],
                  },
                ],
                main: [
                  {
                    multiplier: 1,
                    exercises: [
                      {
                        name: "Schwerpunkt Entspannung",
                        distance: 0,
                        duration: 1200,
                        zone: "",
                      },
                    ],
                  },
                ],
                coolDown: [
                  {
                    multiplier: 1,
                    exercises: [
                      {
                        name: "",
                        distance: 0,
                        duration: 0,
                        zone: "",
                      },
                    ],
                  },
                ],
              },
            ],
            sessionType: "yogaSessions",
            sessionCategory: "yogaSession",
          },
          {
            "_id": {
              "$oid": "6525576fd64a4b08f223351a"
            },
            "activity": "Rad",
            "description": "2h@Z2 (HR)",
            "sessionParts": [
              {
                "warmUp": [
                  {
                    "multiplier": 1,
                    "exercises": [
                      {
                        "name": "",
                        "distance": 0,
                        "duration": 0,
                        "zone": ""
                      }
                    ]
                  }
                ],
                "main": [
                  {
                    "multiplier": 1,
                    "exercises": [
                      {
                        "name": "@Z2",
                        "distance": 0,
                        "duration": 7200,
                        "zone": "bikeHrZ2"
                      }
                    ]
                  }
                ],
                "coolDown": [
                  {
                    "multiplier": 1,
                    "exercises": [
                      {
                        "name": "",
                        "distance": 0,
                        "duration": 0,
                        "zone": ""
                      }
                    ]
                  }
                ]
              }
            ],
            "sessionType": "bikeBeginner",
            "sessionCategory": "bikeSession"
          },
          {
            "_id": {
              "$oid": "64f9df0f08ae0b5fa970151f"
            },
            "activity": "Laufen",
            "description": "1x 500m",
            "sessionParts": [
              {
                "warmUp": [
                  {
                    "multiplier": 1,
                    "exercises": [
                      {
                        "name": "Anfersen",
                        "distance": 0,
                        "duration": 10,
                        "zone": ""
                      },
                      {
                        "name": "Trabpause",
                        "distance": 0,
                        "duration": 10,
                        "zone": ""
                      },
                      {
                        "name": "Kniehebelauf",
                        "distance": 0,
                        "duration": 10,
                        "zone": ""
                      },
                      {
                        "name": "Trabpause",
                        "distance": 0,
                        "duration": 10,
                        "zone": ""
                      },
                      {
                        "name": "Wechselanfersen",
                        "distance": 0,
                        "duration": 10,
                        "zone": ""
                      },
                      {
                        "name": "Trabpause",
                        "distance": 0,
                        "duration": 10,
                        "zone": ""
                      }
                    ]
                  }
                ],
                "main": [
                  {
                    "multiplier": 1,
                    "exercises": [
                      {
                        "name": "@Z2",
                        "distance": 1500,
                        "duration": 0,
                        "zone": "runZ2"
                      },
                      {
                        "name": "@Z3",
                        "distance": 1000,
                        "duration": 0,
                        "zone": "runZ3"
                      },
                      {
                        "name": "@Z2",
                        "distance": 300,
                        "duration": 0,
                        "zone": "runZ2"
                      }
                    ]
                  },
                  {
                    "multiplier": 1,
                    "exercises": [
                      {
                        "name": "@Z5",
                        "distance": 500,
                        "duration": 0,
                        "zone": "runZ5"
                      },
                      {
                        "name": "@Z3",
                        "distance": 500,
                        "duration": 0,
                        "zone": "runZ3"
                      }
                    ]
                  }
                ],
                "coolDown": [
                  {
                    "multiplier": 1,
                    "exercises": [
                      {
                        "name": "Lockern und lächeln",
                        "distance": 500,
                        "duration": 0,
                        "zone": "runZ2"
                      }
                    ]
                  }
                ]
              }
            ],
            "sessionType": "runIntervals",
            "sessionCategory": "runSession"
          }

        ],
        Dienstag: [],
        Mittwoch: [],
        Donnerstag: [],
        Freitag: [],
        Samstag: [],
        Sonntag: [],
      },
    },
    {
      week: 2,
      days: {
        Montag: [],
        Dienstag: [],
        Mittwoch: [],
        Donnerstag: [],
        Freitag: [],
        Samstag: [],
        Sonntag: [],
      },
    },
  ],
};
