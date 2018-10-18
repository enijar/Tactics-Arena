import React, {Component} from "react";
import config from "../config";
import {asset} from "../app/utils";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class GameList extends Component {
    subscriptions = [];

    state = {
        games: [],
    };

    componentDidMount() {
        this.props.context.socket.on('games', this.setGames);
    }

    componentWillUnmount() {
        this.subscriptions.forEach(subscription => {
            this.props.context.socket.close(subscription, this.setGames);
        });
    }

    setGames = games => {
        this.setState({games});
    };

    getFloorGames() {
        const floorIndex = this.props.context.floor - 1;
        return this.state.games.slice(
            floorIndex * config.common.arenas,
            config.common.arenas * (floorIndex + 1),
        );
    }

    render() {
        return (
            <div className="GameList">
                <div className="GameList__games">
                    {this.getFloorGames().map(game => (
                        <div className="GameList__games-game" key={game.id}>
                            <div className="GameList__games-game-arena">
                                <div className="GameList__games-game-arena-top">
                                    {game.players.filter(player => player.position === 'top').map(player => (
                                        <img src={asset('img/unit/front.png')} key={player.id}/>
                                    ))}
                                </div>

                                <div className="GameList__games-game-arena-bottom">
                                    {game.players.filter(player => player.position === 'bottom').map(player => (
                                        <img src={asset('mg/unit/back.png')} key={player.id}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="GameList__floors">
                    {Array.from({length: config.common.floors}).map((floor, index) => (
                        <div
                            className={`
                                GameList__floors-floor
                                ${this.props.context.floor === index + 1 ? 'GameList__floors-floor--selected' : ''}
                            `}
                            onClick={() => this.props.context.changeFloor(index + 1)}
                            key={index}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
