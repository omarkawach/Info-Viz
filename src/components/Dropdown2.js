import React from 'react';
import Select from 'react-select';

// hat-tip:
// https://appdividend.com/2018/10/19/react-dropdown-select-example-tutorial/
// https://stackoverflow.com/questions/43495696/how-to-set-a-default-value-in-react-select

const legend = [
  { label: "Colour: Total # LFLs", coloured: 1 },
  { label: "Colour: LFLs/SqKm", coloured: 2 },
];




export default class Dropdown2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: legend[0]
        }
    }
    
    setColoured(ev) {
        debugger;
        this.props.onDropdown2Selection(ev.coloured); 
        this.setState({
            value: legend[ev.coloured-1] 
        })
        debugger;
    }
    
    render() {
    return (
            <div className="dropdown">
                <div style={{width: '50%'}}>
                <Select
                    options={ legend }
                    autosize={ false }
                    value={ this.state.value }
                    getOptionValue={(option) => option.label} 
                    onChange={this.setColoured.bind(this)}
                />
                </div>
          </div>
        )
    }
}