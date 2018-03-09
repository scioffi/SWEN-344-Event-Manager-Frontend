import React from "react";
import {Redirect} from "react-router-dom";

class RegisterForEvent extends React.Component{
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeCurrency = this.changeCurrency.bind(this);

		this.state = {
			fetching: true,
			event: {},
			price: -1,
			currency: "USD",
			registrationSuccessful: false
		}
	}

	componentDidMount(){
		const url = `${window.events.hostname}/api/getEvent?eventId=${this.props.match.params.eventId}`;

		fetch(url, {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			this.setState({
				fetching: false,
				event: response,
				price: response.price
			});
			console.log(response);
		})
		.catch((error) => {
			console.error(error);
		});
	}

	changeCurrency(event){
		const currency = event.target.value;

		const key = "e7ec8436b2042f209fb149fb9f159a80";
		const url = `http://www.apilayer.net/api/live?access_key=${key}&currencies=${currency}`;

		fetch(url, {
			method: "GET"
		})
		.then((res) => res.json())
		.then((response) => {
			console.log(response);

			const symbol = "USD"+currency;
			const factor = response.quotes[symbol];

			const new_price = factor * this.state.price;

			this.setState({
				price: new_price,
				currency: currency
			});
		})
		.catch((error) => {
			console.error(error);
			alert("Sorry, we were unable to fetch the latest currency conversion at this time.");
		})
	}

	handleSubmit(event){
		event.preventDefault();

		const self = this;

		const data = new URLSearchParams()

		data.append("userId", 1);
		data.append("eventId", this.props.match.params.eventId);
		data.append("price", this.state.price);
		data.append("currency",this.state.currency);

		fetch(`${window.events.hostname}/api/createOrder`, {
			method: "POST",
			body: data
		})
		.then((response) => {
			if(response.status !== 200){
				throw response
			}

			self.setState({
				registrationSuccessful: true
			});
		})
		.catch((error) => {
			console.error(error);
			alert("Darn, an error occurred.");
		})
	}

	render(){
		const Price = () => {
			return (
				<form className="form-inline">
					<h4 style={{display: "inline", verticalAlign: "middle"}}>${this.state.price}&nbsp;&nbsp;</h4>
					<select value={this.state.currency} name="price" className="form-control" onChange={this.changeCurrency}>
						<option value="USD">USD</option>
						<option value="CAD">CAD</option>
						<option value="EUR">Euro</option>
						<option value="GBP">Pounds</option>
						<option value="BTC">BitCoin</option>
					</select>
				</form>
			);
		};

		const PaymentForm = () => {
			const RegisterButton = () => {
				return (
					<div>
						<input type="submit" value="Register for Event" className="btn btn-primary col-md-4" />
					</div>
				);
			};

			if(this.state.event.price <= 0) {
				return (
					<div>
						<p><em>No payment required for a free event.</em></p>
						<br />
						<RegisterButton />
					</div>
				);
			} else {
				return (
					<div>
						<div className='row'>
							<div className='col-md-4'>
								<div className='row'>
									<div className='col-xs-12 form-group required'>
										<label className='control-label'>Name on Card</label>
										<input className='form-control' size='4' type='text' placeholder="ex. Betty White" />
									</div>
								</div>
								<div className='row'>
									<div className='col-xs-12 form-group card required'>
										<label className='control-label'>Card Number</label>
										<input autoComplete='off' className='form-control card-number' size='20' type='text' placeholder="ex. 4111-1111-1111-1111" />
									</div>
								</div>
								<div className='row'>
									<div className='col-xs-4 form-group cvc required'>
										<label className='control-label'>CVC</label>
										<input autoComplete='off' className='form-control card-cvc' placeholder='ex. 311' size='4' type='text' />
									</div>
									<div className='col-xs-4 form-group expiration required'>
										<label className='control-label'>Expiration</label>
										<input className='form-control card-expiry-month' placeholder='MM' size='2' type='text' />
									</div>
									<div className='col-xs-4 form-group expiration required'>
										<label className='control-label'> </label>
										<input className='form-control card-expiry-year' placeholder='YYYY' size='4' type='text' />
									</div>
								</div>
							</div>
						</div>
							<br />
						<RegisterButton />
					</div>
				);
			}
		};

		if(this.state.fetching && !this.state.registrationSuccessful){
			return(
				<div><h2>Loading Registration Details...</h2></div>
			);
		}
		else if(!this.state.fetching && this.state.registrationSuccessful){
			return <Redirect to="/" />;
		}
		else {
			return (
				<div>
					<form onSubmit={this.handleSubmit}>
						<h2>Event Registration - {this.state.event.title}</h2>
							<br />
						<p><strong>Total Price: </strong> {this.state.event.price <= 0 ? "FREE!" : <Price />}</p>
							<br />
						<PaymentForm />
					</form>
				</div>
			);
		}
	}
}

export default RegisterForEvent;