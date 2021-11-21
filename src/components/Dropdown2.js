import React from 'react';
import Select from 'react-select';
import Density from "./Density.png";


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
        this.props.onDropdown2Selection(ev.coloured); 
        this.setState({
            value: legend[ev.coloured-1] 
        })
    }
    
    

    render() {
        var legendText1 = "";
        var legendText2 = "";
        
        if (this.props.state.legend === 1){
            legendText1 = "0 LFLs" ;
            legendText2 = "200 LFLs";}
        else {
            legendText1 = "0.0 LFLs/Km²";
            legendText2 = "10.0 LFLs/Km²";}
    return (
            <div className="dropdown">
                <div style={{width: '35%'}}>
                <Select
                    options={ legend }
                    autosize={ false }
                    value={ this.state.value }
                    getOptionValue={(option) => option.label} 
                    onChange={this.setColoured.bind(this)}
                />
                { legendText1 } <img src = {Density} height ='32px' alt='[Density Bar]'/> {legendText2}
                </div>
          </div>
        )
    }
}