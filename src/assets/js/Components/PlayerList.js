import React, {Component} from "react";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class PlayerList extends Component {
    state = {
        players: []
    };

    componentDidMount() {
        this.props.context.socket.on('player.connected', this.addPlayer);
        this.props.context.socket.on('player.disconnected', this.removePlayer);
    }

    componentWillUnmount() {
        this.props.context.socket.off('player.connected', this.addPlayer);
        this.props.context.socket.off('player.disconnected', this.removePlayer);
    }

    addPlayer = player => {
        const {players} = this.state;
        players.push(player);
        this.setState({players});
    };

    removePlayer = player => {
        const players = this.state.players.filter(p => p.id === player.id);
        this.setState({players});
    };

    render() {
        return (
            <div className="PlayerList">
                <div className="PlayerList__inner">
                    {this.state.players.map(player => (
                        <div className="PlayerList__player" key={player.id}>
                            <span className={`PlayerList__player-status PlayerList__player-status--${player.status}`}>
                            </span>

                            <span className="PlayerList__player-username" title={player.name}>
                                {player.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
