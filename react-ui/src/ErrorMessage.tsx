interface ErrorMessageProps {
	errorMessage: string;
}

export function ErrorMessage({ errorMessage }: ErrorMessageProps) {
	return <h5>{`${errorMessage}`}</h5>;
}

export default ErrorMessage;