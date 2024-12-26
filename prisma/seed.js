const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const me = [
  {
    name: 'Qatar',
    code: 'QA',
    tracks: {
      create: [
        {
          name: 'Losail International Circuit',
          isMotoGP: true,
          trackLayouts: {
            create: [
              {
                name: 'Grand Prix',
                length: 5.38
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'Portugal',
    code: 'PT',
    tracks: {
      create: [
        {
          name: 'Autódromo Internacional do Algarve',
          isMotoGP: true,
          trackLayouts: {
            create: [
              {
                name: 'Grand Prix',
                length: 5.38
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'United States',
    code: 'US',
    tracks: {
      create: [
        {
          name: 'Circuit of the Americas',
          isMotoGP: true,
          trackLayouts: {
            create: [
              {
                name: 'Grand Prix',
                length: 5.51
              }
            ]
          }
        },
        {
          name: 'Pittsburgh International Race Complex',
          trackLayouts: {
            create: [
              {
                name: 'Full Course',
                length: 4.473
              },
              {
                name: 'North Course',
                length: 2.575
              },
              {
                name: 'South Course',
                length: 1.931
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'Spain',
    code: 'ES',
    tracks: {
      create: [
        {
          name: 'Circuit de Barcelona-Catalunya',
          isMotoGP: true,
          trackLayouts: {
            create: [
              {
                name: 'Grand Prix',
                length: 4.66
              }
            ]
          }
        },
        {
          name: 'Circuit Ricardo Tormo(Valencia)',
          isMotoGP: true,
          trackLayouts: {
            create: {
              name: 'Grand Prix',
              length: 4.01
            }
          }
        },
        {
          name: 'Circuito de Jerez',
          isMotoGP: true,
          trackLayouts: {
            create: {
              name: 'Grand Prix',
              length: 4.42
            }
          }
        },
        {
          name: 'MotorLand Aragón',
          isMotoGP: true,
          trackLayouts: {
            create: {
              name: 'Grand Prix',
              length: 5.08
            }
          }
        }
      ]
    }
  },
  {
    name: 'France',
    code: 'FR',
    tracks: {
      create: {
        name: 'Le Mans',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 4.19
          }
        }
      }
    }
  },
  {
    name: 'Italy',
    code: 'IT',
    tracks: {
      create: {
        name: 'Autodromo Internazionale del Mugello',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 5.25
          }
        }
      }
    }
  },
  {
    name: 'Netherlands',
    code: 'NL',
    tracks: {
      create: {
        name: 'TT Circuit Assen',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 4.54
          }
        }
      }
    }
  },
  {
    name: 'Germany',
    code: 'DE',
    tracks: {
      create: {
        name: 'Sachsenring',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 3.67
          }
        }
      }
    }
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    tracks: {
      create: {
        name: 'Silverstone Circuit',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 5.9
          }
        }
      }
    }
  },
  {
    name: 'Austria',
    code: 'AT',
    tracks: {
      create: {
        name: 'Red Bull Ring',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 4.35
          }
        }
      }
    }
  },
  {
    name: 'Indonesia',
    code: 'ID',
    tracks: {
      create: {
        name: 'Pertamina Mandalika Circuit',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 4.3
          }
        }
      }
    }
  },
  {
    name: 'Japan',
    code: 'JP',
    tracks: {
      create: {
        name: 'Mobility Resort Motegi',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 4.8
          }
        }
      }
    }
  },
  {
    name: 'Australia',
    code: 'AU',
    tracks: {
      create: {
        name: 'Phillip Island',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 4.45
          }
        }
      }
    }
  },
  {
    name: 'Thailand',
    code: 'TH',
    tracks: {
      create: {
        name: 'Chang International Circuit',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 4.55
          }
        }
      }
    }
  },
  {
    name: 'Malaysia',
    code: 'MY',
    tracks: {
      create: {
        name: 'Sepang International Circuit',
        isMotoGP: true,
        trackLayouts: {
          create: {
            name: 'Grand Prix',
            length: 5.54
          }
        }
      }
    }
  },
  {
    name: 'Canada',
    code: 'CA',
    tracks: {
      create: [
        {
          name: 'Calabogie Motorsports Park',
          trackLayouts: {
            create: {
              name: 'Main Track',
              length: 5.05
            }
          }
        },
        {
          name: 'Canadian Tire Motorsport Park',
          trackLayouts: {
            create: [
              {
                name: 'Grand Prix Circuit',
                length: 3.975
              },
              {
                name: 'Driver Development Track',
                length: 2.88
              }
            ]
          }
        },
        {
          name: 'Shannonville Motorsport Park',
          trackLayouts: {
            create: [
              {
                name: 'Long Track',
                length: 4.03
              },
              {
                name: 'Pro Track',
                length: 2.47
              },

              {
                name: 'Nelson Track',
                length: 1.8
              },
              {
                name: 'Fabi Track',
                length: 2.23
              }
            ]
          }
        },
        {
          name: 'Toronto Motorsports Park',
          trackLayouts: {
            create: [
              {
                name: 'Road Racing Park',
                length: 2.99
              }
            ]
          }
        },
        {
          name: 'Grand Bend Motorplex',
          trackLayouts: {
            create: [
              {
                name: 'Technical Track',
                length: 2.23
              }
            ]
          }
        }
      ]
    }
  }
]

const bikes = [
  {
    name: 'Yamaha',
    models: {
      create: [
        { name: 'YZF-R1' },
        { name: 'YZF-R1M' },
        { name: 'YZF-R9' },
        { name: 'YZF-R7' },
        { name: 'YZF-R6' },
        { name: 'YZF-R3' },
        { name: 'YZF-R25' },
        { name: 'MT-10 SP' },
        { name: 'MT-10' },
        { name: 'MT-09 SP' },
        { name: 'MT-09' },
        { name: 'MT-07' },
        { name: 'MT-03' }
      ]
    }
  },
  {
    name: 'Honda',
    models: {
      create: [
        { name: 'CBR1000RR-R Fireblade' },
        { name: 'CBR600RR' },
        { name: 'CBR650R' },
        { name: 'CBR500R' },
        { name: 'CB1000R' },
        { name: 'CB650R' },
        { name: 'CB500F' }
      ]
    }
  },
  {
    name: 'Suzuki',
    models: {
      create: [
        { name: 'GSX-R1000' },
        { name: 'GSX-R1000R' },
        { name: 'GSX-R750' },
        { name: 'GSX-R600' },
        { name: 'GSX-S1000' },
        { name: 'GSX-S1000F' },
        { name: 'GSX-S750' },
        { name: 'GSX-S750Z' },
        { name: 'GSX-8R' },
        { name: 'GSX-S1000GT' }
      ]
    }
  },
  {
    name: 'Kawasaki',
    models: {
      create: [
        { name: 'Ninja ZX-10R' },
        { name: 'Ninja ZX-10RR' },
        { name: 'Ninja ZX-6R' },
        { name: 'Ninja 400' },
        { name: 'Ninja 650' },
        { name: 'Ninja H2' },
        { name: 'Ninja H2R' },
        { name: 'Ninja 1000SX' },
        { name: 'Z900' },
        { name: 'Z650' },
        { name: 'Z400' }
      ]
    }
  },
  {
    name: 'BMW',
    models: {
      create: [
        { name: 'S 1000 RR' },
        { name: 'S 1000 R' },
        { name: 'S 1000 XR' },
        { name: 'M 1000 RR' },
        { name: 'M 1000 R' },
        { name: 'G 310 R' },
        { name: 'G 310 GS' }
      ]
    }
  },
  {
    name: 'Ducati',
    models: {
      create: [
        { name: 'Panigale V4' },
        { name: 'Panigale V4 R' },
        { name: 'Panigale V2' },
        { name: 'SuperSport 950' },
        { name: 'Streetfighter V4' },
        { name: 'Streetfighter V2' },
        { name: 'Diavel 1260' },
        { name: 'Monster 1200' },
        { name: 'Monster 821' },
        { name: 'Superleggera V4' },
        { name: 'XDiavel' },
        { name: 'Hypermotard 950' },
        { name: 'Multistrada V4' },
        { name: 'Multistrada V2' },
        { name: 'Sport 1000 Biposto' },
        { name: '1199 Panigale' },
        { name: '1299 Panigale' },
        { name: '848 Evo' }
      ]
    }
  },
  {
    name: 'Triumph',
    models: {
      create: [
        { name: 'Daytona Moto2 765' },
        { name: 'Daytona 675' },
        { name: 'Street Triple R' },
        { name: 'Street Triple RS' },
        { name: 'Speed Triple 1200 RS' },
        { name: 'Tiger 900' },
        { name: 'Rocket 3' },
        { name: 'Trident 660' },
        { name: 'Speed Twin' },
        { name: 'Thruxton RS' }
      ]
    }
  },
  {
    name: 'Aprilia',
    models: {
      create: [
        { name: 'RS 660' },
        { name: 'Tuono 660' },
        { name: 'RSV4 1100' },
        { name: 'RSV4 Factory' },
        { name: 'Tuono V4 1100' },
        { name: 'Tuono V4 Factory' },
        { name: 'Shiver 900' },
        { name: 'Dorsoduro 900' }
      ]
    }
  }
]

async function main() {
  const countriesInserted = me.map(x => prisma.country.create({ data: x }))
  const bikesInserted = bikes.map(x => prisma.make.create({ data: x }))

  const res = await Promise.all(countriesInserted)
  const res2 = await Promise.all(bikesInserted)
  console.log({ res, res2 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
