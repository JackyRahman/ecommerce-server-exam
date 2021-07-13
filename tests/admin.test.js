const request = require('supertest')
const app = require('../app')

let UserValid = {
  email: 'qwe@mail.com',
  password: 'qwe'
}
let header = {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJxd2VAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTg0MTgxNTB9.KdCf_venoEYsckdLcmqGmYgrfS7R5KtJpS3HQHrqBec"
}
// ============= login success ===============
describe('Login success case Post', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/login')
    .send(UserValid)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      header = body.access_token
      expect(status).toBe(200)
      expect(body).toEqual({"access_token": expect.any(String)})
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

let UserWrongPassword = {
  email: 'qwe@mail.com',
  password: 'qwea'
}
// ============= login email ada password salah ===============
describe('Login wrong password case Post', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/login')
    .send(UserWrongPassword)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toEqual({
        "message": "Invalid Email or Password"
      })
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

let UserEmailNotRegistered = {
  email: 'asassa@mail.com',
  password: 'qwea'
}
// ============= login tidak terdaftar ===============
describe('Login email not registered case Post', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/login')
    .send(UserEmailNotRegistered)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toEqual({
        "message": "Invalid Email or Password"
      })
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

// ============= login tidak memasukan inputan ===============
describe('Login with not input case Post', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/login')
    .send()
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(500)
      expect(body).toEqual({
        "message": "WHERE parameter \"email\" has invalid \"undefined\" value"
      })
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

// ============= read product ===============
describe('Get all Products case', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .get('/products')
    .send()
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

// ============= create product ===============
describe('create Products success case', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/products')
    .set({headers: header})
    .send({
      name: "coklat",
      image_url: "tes",
      price: 10000,
      stock: 99
    })
    .set('Accept', 'application/json')
    .set({
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJxd2VAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTg0MTgxNTB9.KdCf_venoEYsckdLcmqGmYgrfS7R5KtJpS3HQHrqBec"
    })
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

// ============= create product not have header ===============
describe('create Products success case', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/products')
    .send({
      name: "coklat",
      image_url: "tes",
      price: 10000,
      stock: 99
    })
    .set('Accept', 'application/json')
    // .set(header)
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toEqual({
        "message": "Login First"
      })
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

// ============= create product with minus price===============
describe('create Products with minus price case', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/products')
    .set({headers: header})
    .send({
      name: "coklat",
      image_url: "tes",
      price: -10000,
      stock: 99
    })
    .set('Accept', 'application/json')
    .set({
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJxd2VAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTg0MTgxNTB9.KdCf_venoEYsckdLcmqGmYgrfS7R5KtJpS3HQHrqBec"
    })
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toEqual({
        "message": [
            "price can't be lower than 0"
        ]
    })
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

// ============= create product with minus stock===============
describe('create Products with minus stock case', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/products')
    .set({headers: header})
    .send({
      name: "coklat",
      image_url: "tes",
      price: 10000,
      stock: -99
    })
    .set('Accept', 'application/json')
    .set({
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJxd2VAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTg0MTgxNTB9.KdCf_venoEYsckdLcmqGmYgrfS7R5KtJpS3HQHrqBec"
    })
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toEqual({
        "message": [
            "stock can't be lower than 0"
        ]
    })
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})

// ============= create product with not type===============
describe('create Products with bot type', ()=>{
  it('it responce',(done)=>{
    return request(app)
    .post('/products')
    .set({headers: header})
    .send({
      name: "coklat",
      image_url: "tes",
      price: 10000,
      stock: "asd"
    })
    .set('Accept', 'application/json')
    .set({
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJxd2VAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTg0MTgxNTB9.KdCf_venoEYsckdLcmqGmYgrfS7R5KtJpS3HQHrqBec"
    })
    .expect('Content-Type', /json/)
    .then((response)=>{
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toEqual({
        "message": [
            "Must be an number of stock"
        ]
    })
      done()
    })
    .catch((err)=>{
      done(err);
    })
  })
})