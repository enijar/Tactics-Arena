import React, {createRef} from "react";
import AppContext from "../Decorators/AppContext";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import GUI from "../Game/GUI";

@AppContext
export default class PlayScreen extends BaseScreen {
    game = createRef();
    gui = new GUI();

    componentDidMount() {
        this.gui.mount(this.game.current);
        this.gui.render();
    }

    componentWillUnmount() {
        this.gui.destroy();
    }

    render() {
        return (
            <Screen name="PlayScreen">
                <div ref={this.game}/>
            </Screen>
        );
    }
}
