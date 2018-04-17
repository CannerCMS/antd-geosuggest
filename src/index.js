// @flow
import * as React from 'react';
import { Select, Spin, Button } from 'antd';
import debounce from 'lodash.debounce';
const Option = Select.Option;

type Props = {
  placeholder: string,
  minLength: number,
  location: any,
  bounds: any,
  offset: number,
  radius: number,
  types: Array<string>,
  multiple: boolean,
  onChange: (Array<ResultObj> => void)
}

type State = {
  fetching: boolean,
  value: Options,
  data: Array<{
    text: string,
    value: string
  }>,
  disabled: boolean
}

type Options = Array<{
  key: string,
  label: string
}>

type ResultObj = {
  placeId: string,
  gmaps?: any,
  location?: Object
}

export default class AntdGeosuggest extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.fetchLocation = debounce(this.fetchLocation, 800);

    // $FlowFixMe
    this.autocompleteService = new google.maps.places.AutocompleteService();
    // $FlowFixMe
    this.geocoder = new google.maps.Geocoder();
  }

  autocompleteService: google;
  geocoder: google;
  selection: ?Select;

  state = {
    data: [],
    value: [],
    fetching: false,
    disabled: false
  }

  static defaultProps = {
    placeholder: "Type and search for places"
  }

  componentDidUpdate() {
    const {multiple} = this.props;
    const {value, disabled} = this.state;

    if (!disabled && !multiple && value.length >= 1 && this.selection) {
      this.selection.blur()
      this.setState({disabled: true})
    }
  }

  fetchLocation = (value: string) => {
    const isShorterThanMinLength = value.length < this.props.minLength;

    if (isShorterThanMinLength || value.length === 0) {
      return;
    }

    let options = {
      input: value
    }

    const mapOptions = ['location', 'radius', 'bounds', 'types'];
    mapOptions.forEach(option => {
      if (this.props[option]) {
        // $FlowFixMe
        options[option] = this.props[option];
      }
    });

    this.setState({data: [], fetching: true}, () => {
      this.autocompleteService.getPlacePredictions(
        options,
        suggestsGoogle => {
          const suggestions = suggestsGoogle || [];
          const data = suggestions.map(datum => {
            return {
              text: datum.description,
              value: datum.place_id
            }
          })

          this.setState({data, fetching: false});
        }
      );
    });
  }
  
  handleChange = (value: Options) => {
    const that = this;
    function promiseGeocode(singleSite) {
      return new Promise((resolve) => {
        let newData: ResultObj = {placeId: singleSite.key};
        that.geocoder.geocode(
          newData,
          (results, status) => {
            // $FlowFixMe
            if (status === google.maps.GeocoderStatus.OK) {
              var gmaps = results[0],
                location = gmaps.geometry.location;
    
              newData.gmaps = gmaps;
              newData.location = {
                lat: location.lat(),
                lng: location.lng()
              };
            }
            resolve(newData);
          }
        );
      })
    }

    Promise.all(value.map(site => promiseGeocode(site))).then(result => {
      that.props.onChange(result);
    })
    
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  clearValue = () => {
    this.setState({
      data: [],
      value: [],
      fetching: false,
      disabled: false
    }, this.props.onChange([]))
  }

  render() {
    const { fetching, data, value, disabled } = this.state;
    const { placeholder } = this.props;

    return (
      <div>
        <Select
          ref={node => this.selection = node}
          mode="multiple"
          labelInValue
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          notFoundContent={!disabled && (fetching ? <Spin size="small" /> : "No result")}
          filterOption={false}
          onSearch={this.fetchLocation}
          onChange={this.handleChange}
          style={{width: "80%", marginRight: '10px'}}
        >
          {data.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
        <Button onClick={this.clearValue}>Clear</Button>
      </div>
    );
  }
}
