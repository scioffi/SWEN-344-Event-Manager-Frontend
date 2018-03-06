import moment from "moment";

const DateTime = (props) => {
	return moment.unix(props.timestamp).format("MMMM Do YYYY - H:mm A");
};

export default DateTime;