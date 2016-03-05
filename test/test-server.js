'use strict';
/* eslint-env mocha */
/* eslint camelcase: [2, {properties: "never"} ] */


var expect = require('must');
var global = require('../config/config');
var app = require('../server');
var request = require('supertest');
var qs = require('qs');


describe('Posts API GET', function() {
  it('returns posts from evernote', function(done) {
    var upc = '636997209098';
    request(app)
    .get('/api/nord/upc/' + upc)
    .expect(200)
    .end(function(err,res) {
      expect(err).to.be.null();
      console.log('body: ' + JSON.stringify(res));
      res.body.Name.must.equal("MINI LOVE ARROWS");
      res.body.StyleId.must.equal(4227420);
      res.body.Price.must.equal("2.00");
      done();
    });
  });

  xit('returns a particular store within a postal code (50 mile default)', function(done) {
    var postal = 98101;
    var result = [
      {
        name: 'Nordstrom Downtown Seattle',
        store_number: 1
      },
      {
        name: 'Nordstrom Bellevue Square',
        store_number: 4
      },
      {
        name: 'Nordstrom Northgate',
        store_number: 2
      },
      {
        name: 'Nordstrom Southcenter',
        store_number: 5
      },
      {
        name: 'Nordstrom Tacoma Mall',
        store_number: 6
      },
      {
        name: 'Nordstrom Alderwood Mall',
        store_number: 10
      }
    ];

    request(app)
      .get('/api/nord/stores/?postalCode=' + postal)
      .set('Accept', 'application/json')
      .set(global.readTokenHeaderName, 'def789')
      .end(function(err, res) {
        expect(err).to.be.null();
        console.log('body: ' + JSON.stringify(res));
        res.body.length.must.equal(6);
        // we want to see what the server returned
        // before failing at the request status.
        res.status.must.equal(200);
        done();
      });
  });

  it('returns a list of beacons', function(done) {
    request(app)
    .get('/api/beacons')
    .set(global.readTokenHeaderName, 'def789')
    .expect(200, done);
  });

  it('returns all beacons based on context/UUID', function(done) {
    request(app)
    .get('/api/beacons/?context=0xFF20')
    .set(global.readTokenHeaderName, 'def789')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      res.body.length.must.equal(2);
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('returns a beacon based on serial number', function(done) {
    request(app)
    .get('/api/beacons/?serial_number=1284')
    .set(global.readTokenHeaderName, 'def789')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      res.body.length.must.equal(1);
      if (err) {
        throw err;
      }

      done();
    });
  });

  it('returns a list of available outfits', function(done) {
    var expected = {
      context: '0xFF20',
      serial_number: '4167',
      major: 5,
      minor: 1,
      store_location: 'Southcenter'
    };

    request(app)
      .get('/api/outfits')
      .expect(200)
      .end(function(err, res) {
        expect(err).to.be.null();
        res.body.length.must.equal(1);
        done();
      });
  });

  it('returns an outfit by floor_number/mannequin_number', function(done) {
    var params = {
      floor_number: testFloorNumber,
      mannequin_number: testMannequinNumber
    };

    request(app)
      .get('/api/outfits?' + qs.stringify(params))
      .expect(200)
      .end(function(err, res) {
        expect(err).to.be.null();
        res.body.length.must.equal(1);

        var ex = res.body[0];
        ex.floor_number.must.equal(testFloorNumber);
        ex.mannequin_number.must.equal(testMannequinNumber);
        ex.title.must.equal(testOutfit.title);
        ex.items.length.must.equal(1);
        ex.beacon_id.must.equal(testOutfit.beacon_id);
        ex.image_url.must.equal(testOutfit.image_url);
        ex.title.must.equal(testOutfit.title);
        ex.items[0].Price.must.equal(testOutfit.items[0].Price);
        ex.items[0].ImageUrl.must.equal(testOutfit.items[0].ImageUrl);
        ex.items[0].StyleId.must.equal(testOutfit.items[0].StyleId);
        ex.items[0].ImageUrl.must.equal(testOutfit.items[0].ImageUrl);
        ex.items[0].ImageUrl.must.equal(testOutfit.items[0].ImageUrl);
        done();
      });
  });

  xit('returns a single outfit based on beacon id', function(done) {
    done();
  });
});

describe('Mannequin API POST', function() {
  it('creates a new beacon on the server', function(done) {
    var beacon = {
      context: '0xFF20',
      serial_number: '9876',
      major: 5,
      minor: 9,
      store_location: 'Southcenter'
    };

    request(app)
      .post('/api/beacons')
      .set(global.writeTokenHeaderName, 'abc123')
      .send(beacon)
      .expect(201, done);
  });

  var createOutfit = {
    beacon_id: 'abc123',
    store_number: 5,
    floor_number: 2,
    mannequin_number: 3,
    description: 'this abc outfit is the alphabetest!',
    image_url: 'https://c1.staticflickr.com/9/8369/8423317669_85aa7c3ab5.jpg',
    items: [{
      AltImageUrl: 'http://g.nordstromimage.com/imagegallery/store/product/Medium/3/_9560563.jpg',
      AlternativeImages: 1,
      AvailableColorCount: 5,
      AverageRating: 4.9,
      BrandName: 'Bose',
      FreeShipping: 0,
      Gender: 'Unisex',
      HolidayMessage: '<null>',
      ImageUrl: 'http://g.nordstromimage.com/imagegallery/store/product/Thumbnail/14/_9560554.jpg',
      IsAnniversary: 0,
      IsEarlyAccess: 0,
      IsGiftWithPurchase: 0,
      IsOutfit: 0,
      IsUMAP: 0,
      MultipleColors: 1,
      Name: 'Bose SoundLink ColorBluetooth Speaker',
      NearStoreAvailability: 1,
      New: 0,
      PickupInStore: 1,
      Price: '129.00',
      RecommendedCount: 0,
      ReviewCount: 23,
      SaleFlag: 'None',
      SaleLabel: '',
      ShowHolidayIndicator: 0,
      SpriteImageUrl: 'http://s.nordstromimage.com/ImageDelivery/swatchsprite.jpg?photos=0_9560500-15_9558275-19_9560559-7_9560527-9_9560549&width=12&height=12&ql=60',
      StyleId: 3841370,
      Upc: '0017817647083'
    }],
    title: 'tester outfit',
    user_id: 'jon madison'
  };

  it('creates a new outfit on the server', function(done) {
    request(app)
      .post('/api/outfits')
      .set(global.writeTokenHeaderName, 'abc123')
      .send(createOutfit)
      .expect(201, done);
  });

  it('creates existing, overwriting existing outfit if \'clobber\' param given', function(done) {
    createOutfit.store_number = testStoreNumber;
    createOutfit.mannequin_number = testMannequinNumber;

    request(app)
      .post('/api/outfits?clobber=true')
      .set(global.writeTokenHeaderName, 'abc123')
      .send(createOutfit)
      .expect(201)
      .end(function(err) {
        if (err) {
          throw err;
        }

        var params = {
          floor_number: testFloorNumber,
          mannequin_number: testMannequinNumber
        };

        request(app)
          .get('/api/outfits?' + qs.stringify(params))
          .set(global.readTokenHeaderName, 'def789')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            expect(err).to.be.null();
            res.body.length.must.equal(1);
            done();
          });
      });
  });
});

xdescribe('Mannequin API DELETE', function() {
  it('deletes an existing outfit on the server', function(done) {
    request(app)
      .get('/api/outfits?store_number=' + testStoreNumber + '&mannequin_number=' + testMannequinNumber)
      .set(global.readTokenHeaderName, 'def789')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        var outfit = res.body[0];
        request(app)
          .delete('/api/outfits/' + outfit._id)
          .set(global.writeTokenHeaderName, 'abc123')
          .expect(204, done);
      });
  });
});

xdescribe('Mannequin API PATCH', function() {
  it('updates an outfit with the specified ID', function(done) {
    Outfit.find({}, function(err, outfits) {
      if (err) {
        throw err;
      }

      if (outfits.length === 0) {
        throw new Error('no outfits to test against.');
      }

      var outfit = outfits[0];

      var patchOps = [
        {
          op: 'add',
          path: '/items',
          value: [
            {
              color_name: 'red',
              description: 'the red top',
              product_name: 'Nike Red Top',
              image_url: 'https://c1.staticflickr.com/9/8369/8423317669_85aa7c3ab5.jpg',
              sku_id: '1938413948124',
              swatch_url: 'http://g.nordstromimage.com/imagegallery/store/product/SwatchSmall/10/_10321030.jpg'
            },
            {
              color_name: 'green',
              description: 'the green pants',
              product_name: 'Nike Green Pants',
              image_url: 'https://c1.staticflickr.com/9/8369/8423317669_85aa7c3ab5.jpg',
              sku_id: '1938413948124',
              swatch_url: 'http://g.nordstromimage.com/imagegallery/store/product/SwatchSmall/10/_10321030.jpg'
            }
          ]
        }
      ];

      var endpoint = '/api/outfits/' + outfit.id;
      console.log('patching endpoint ' + endpoint);

      request(app)
        .patch(endpoint)
        .set('Accept', 'application/json')
        .set(global.writeTokenHeaderName, 'abc123')
        .send(patchOps)
        .expect(200, done);
    });
  });
});

