import React, {Component} from "react";
import PropTypes from "prop-types";
import config from "../config";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class GameList extends Component {
    static defaultProps = {
        games: []
    };

    static propTypes = {
        games: PropTypes.array
    };

    getFloorGames() {
        const floorIndex = this.props.context.floor - 1;
        return this.props.games.slice(floorIndex * config.arenas, config.arenas * (floorIndex + 1));
    }

    render() {
        console.log(this.getFloorGames());

        return (
            <div className="GameList">
                <div className="GameList__games">
                    {this.getFloorGames().map((game, index) => (
                        <div className="GameList__games-game" key={game.id}>
                            <div className="GameList__games-game-arena">
                                <div
                                    className="GameList__games-game-arena-top"
                                    onClick={() => this.props.context.setAvatar(index + 1, 'top')}
                                >
                                    {game.players.filter(player => player.position === 'top').map(player => (
                                        <img src="img/unit/front.png" key={player.id}/>
                                    ))}
                                </div>

                                <div
                                    className="GameList__games-game-arena-bottom"
                                    onClick={() => this.props.context.setAvatar(index + 1, 'bottom')}
                                >
                                    {game.players.filter(player => player.position === 'bottom').map(player => (
                                        <img src="img/unit/back.png" key={player.id}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="GameList__floors">
                    {Array.from({length: config.floors}).map((floor, index) => (
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
