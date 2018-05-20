import React from 'react';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-reader';


class Web3QRScanner extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scanning: false,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this);
    this.web3ScanQRCode = this.web3ScanQRCode.bind(this);
    this.startScan = this.startScan.bind(this);
  }

  startScan() {
    this.setState({
      scanning: true,
    });
  }

  handleScan(data) {
    if (data) {
      this.setState({
        result: data,
        scanning: false,
      });
      this.props.onScan(data);
    }
  }

  handleError(err) {
    console.error(err);
  }

  web3ScanQRCode() {
    window.web3.currentProvider.scanQRCode((/^.+$/))
      .then(this.handleScan)
      .catch(this.handleError)
  }

  render() {
    const {
      delay,
      buttonStyle,
      qrReaderStyle,
    } = this.props;
    const { scanning } = this.state;

    if (window.web3 && window.web3.currentProvider && window.web3.currentProvider.scanQRCode) {
      return (
        <div>
          <img src="/qr.png" style={buttonStyle} onClick={this.web3ScanQRCode} />
          <p>{this.state.result}</p>
        </div>
      );
    } else if (scanning) {
      return (
        <QrReader
              delay={delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={qrReaderStyle}
            />
      );
    } else {
      return (
        <div>
          <img src="/qr.png" style={buttonStyle} onClick={this.startScan} />
          <p>{this.state.result}</p>
        </div>
      );
    }
  }
}

Web3QRScanner.propTypes = {
  delay: PropTypes.number,
  onScan: PropTypes.func,
  buttonStyle: PropTypes.object,
  qrReaderStyle: PropTypes.object,
};

Web3QRScanner.defaultProps = {
  delay: 300,
  onScan: function(data) { },
  buttonStyle: {width: 40, height: 40},
  qrReaderStyle: {width: '100%'},
};

export default Web3QRScanner;
