import React from 'react';
import Select from 'react-select';

// hat-tip:
// https://appdividend.com/2018/10/19/react-dropdown-select-example-tutorial/
// https://stackoverflow.com/questions/43495696/how-to-set-a-default-value-in-react-select

const chart = [
  { label: "Compare: Age & Income", selected: 1 },
  { label: "Compare: Houses & Income", selected: 2 },
  { label: "Compare: Houses & Population Density", selected: 3 },
  { label: "Compare: LFL Density & Population Density", selected: 4 },
  { label: "Compare: % Visible Minorities & Non-official Languages", selected: 5 }
];

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: chart[0]
        }
    }
    
    setSelected(ev) {
        this.props.onDropdownSelection(ev.selected); 
        this.setState({
            value: chart[ev.selected-1] 
        })
    }
    
    render() {
    return (
            <div className="dropdown">
                <div>
                <Select
                    options={ chart }
                    autosize={ false }
                    value={ this.state.value }
                    getOptionValue={(option) => option.label} 
                    onChange={this.setSelected.bind(this)}
                />
                </div>
          </div>
        )
    }
}
