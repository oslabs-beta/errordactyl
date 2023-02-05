interface ResponseProps {
	response?: string
}

// component to show response data for a particular endpoint
export default function Response({ response }: ResponseProps) {
  // needs to display data returned from run routes action
  return (
    <div>
      {response ? response : ''}
    </div>
  )
}