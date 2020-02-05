let api = {};

let fotos = [
    {_id: 1, titulo: 'Leão', url:'http://www.fundosanimais.com/Minis/leoes.jpg' },
    {_id: 2, titulo: 'Leão 2', url:'http://www.fundosanimais.com/Minis/leoes.jpg' }
];

api.lista = (req, res) => {
    res.json(fotos);
}

api.buscaPorId = (req, res) => {

    let foto = fotos.find((foto) => {
        return foto._id = req.params.id;
    });

    res.json(foto);
};

module.exports = api;