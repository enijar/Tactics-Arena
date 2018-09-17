import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class PlayerList extends Component {
    static defaultProps = {
        players: []
    };

    static propTypes = {
        players: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            status: PropTypes.string
        }))
    };

    render() {
        return (
            <div className="PlayerList">
                <div className="PlayerList__inner">
                    {this.props.players.map(player => (
                        <div className="PlayerList__player" key={player.id}>
                            <span className={`PlayerList__player-status PlayerList__player-status--${player.status}`}>
                            </span>

                            <span className="PlayerList__player-username" title={player.username}>
                                {player.username}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
