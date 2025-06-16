const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const sinonChai = require('sinon-chai').default || require('sinon-chai');
chai.use(sinonChai);

const Estudiante = require('../models/Estudiante');
const estudianteController = require('../controllers/estudianteController');

describe('Estudiante Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('listarEstudiantes', () => {
    it('debe retornar todos los estudiantes', async () => {
      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      const estudiantesMock = [{ id: 1, nombre: 'Juan' }];
      sinon.stub(Estudiante, 'findAll').resolves(estudiantesMock);

      await estudianteController.listarEstudiantes(req, res);

      expect(res.json).to.have.been.calledWith(estudiantesMock);
    });

    it('debe manejar errores', async () => {
      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      sinon.stub(Estudiante, 'findAll').rejects(new Error('DB error'));

      await estudianteController.listarEstudiantes(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWithMatch({ error: 'DB error' });
    });
  });

  describe('registrarEstudiante', () => {
    it('debe registrar un estudiante', async () => {
      const req = { body: { nombre: 'Ana', email: 'ana@mail.com', fecha_nacimiento: '2000-01-01' } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      const estudianteMock = { id: 2, ...req.body };
      sinon.stub(Estudiante, 'create').resolves(estudianteMock);

      await estudianteController.registrarEstudiante(req, res);

      expect(res.json).to.have.been.calledWith(estudianteMock);
    });

    it('debe manejar errores al registrar', async () => {
      const req = { body: { nombre: 'Ana', email: 'ana@mail.com', fecha_nacimiento: '2000-01-01' } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      sinon.stub(Estudiante, 'create').rejects(new Error('DB error'));

      await estudianteController.registrarEstudiante(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWithMatch({ error: 'DB error' });
    });
  });
});