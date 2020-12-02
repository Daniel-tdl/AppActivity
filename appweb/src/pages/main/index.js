import React, {Component, useState} from 'react'
import api from '../../services/api'

import './styles.css'

const initial = {
    nome: '',
    description: '',
    realizationsDate: '',
    typeID: '',
    priorityID: ''    
}

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activitys: [],
            nome: '',
            description: '',
            realizationsDate: '',
            typeID: '',
            priorityID: ''
        }
    
        this.handleNome = this.handleNome.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleRealizationsDate = this.handleRealizationsDate.bind(this);
        this.handleTypeID = this.handleTypeID.bind(this);
        this.handlePriorityID = this.handlePriorityID.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePriorityID(e) {
        this.setState({priorityID: e.target.value});
    }    

    handleTypeID(e) {
        console.log(e.target.value)
        this.setState({typeID: e.target.value});
    }
    
    handleRealizationsDate(e) {
        this.setState({realizationsDate: e.target.value});
    }
        
    handleDescription(e) {
        this.setState({description: e.target.value});
    }    

    handleNome(e) {
        this.setState({nome: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {
            nome: this.state.nome,
            description: this.state.description,
            realizationsDate: this.state.realizationsDate,
            typeID: this.state.typeID,
            priorityID: this.state.priorityID
        }

        this.cadastrar(data);
        this.loadActivity();
    }

    cadastrar = async (data) => {
        console.log(data)
        const response = await api.post('/activity/create', data)
            .then((response) => {
                console.log(response)   
                if (response.data.status === 'sucess') {
                    alert('Cadastro realixado com sucesso!')
                }
            })
            .catch((e) => {
                alert('Erro ao cadastrar!')
            });
    }

    componentDidMount() {
        this.loadActivity();
    }

    loadActivity = async () => {
        const response = await api.get('/activity/index');
        this.setState({activitys: response.data.activitys})
    };

    
    handleInputChange(e) {
        const {name, value} = e.target;
    }

    render() {
        return (
            <div className="activitys-list">    
                <div> 
                    <form onSubmit={this.handleSubmit} >
                        <div className="promotion-form-group">
                            <label htmlFor="nome">Nome</label>
                            <input id="nome" name="nome" type="text" value={this.state.nome} onChange={this.handleNome} />
                        </div>
                        <div className="promotion-form-group">
                            <label htmlFor="description">Descrição</label>
                            <textarea id="description" name="description" value={this.state.description} onChange={this.handleDescription}  />
                        </div>
                        <div className="promotion-form-group">
                            <label htmlFor="realizationsDate">Data de realização</label>
                            <input id="realizationsDate" name="realizationsDate" type="date" value={this.state.realizationsDate} onChange={this.handleRealizationsDate}  />
                        </div>
                        <div className="promotion-form-group">
                            <label>
                                Prioridade
                                <select value={this.state.priorityID} onChange={this.handlePriorityID} >
                                    <option value="1">Normal</option>
                                    <option value="2">Urgente</option>
                                </select>
                            </label>
                        </div>
                        <div className="promotion-form-group">
                            <label>
                                Tipos de atividades
                                <select value={this.state.typeID} onChange={this.handleTypeID} >
                                    <option value="1">Manutenção</option>
                                    <option value="2">Desenvolvimento</option>
                                    <option value="3">Documentação</option>
                                </select>
                            </label>
                        </div>
                        <div className="promotion-form-group">
                            <button type="submit" value="Enviar"> Salvar</button>
                        </div>
                    </form>
                </div>
                {this.state.activitys.map(activity => (
                    <article key={activity.id}>
                      <strong>{activity.nome}</strong>
                      <p>{activity.description}</p>  
                      <a href="" >Editar</a>
                    </article>
                ))}
            </div>
        )
    }
}