const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://cpd:ubnt2014@itservicedesk.hctlpin.mongodb.net/?retryWrites=true&w=majority&appName=ITServiceDesk";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexão estabelecida com o MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

const ChamadoSchema = new mongoose.Schema({
  nome: String,
  tipo: String,
  departamento: String,
  sobre: String,
  data: String,
});

const Chamado = mongoose.model("Chamado", ChamadoSchema);


module.exports = { connectToDatabase, Chamado };
