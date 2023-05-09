// import { WindowUtils } from 'msal'
import React from 'react'
import { toastr } from 'react-redux-toastr'

/**
 * Higher-order component that wraps a component with error handling.
 *
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped.
 * @param {React.ComponentType} MainLayout - The layout component to be rendered if an error occurs.
 * @param {function} onError - The error-handling function to be called if an error occurs during rendering.
 * @param {Error} onError.error - The error that occurred.
 * @param {object} onError.info - The component stack trace.
 *
 * @returns {React.ComponentType} The wrapped component.
 */
const withErrorBoundary = (WrappedComponent, MainLayout, onError) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hasError: false,
        error: { message: '', stack: '' },
        errorHandled: false,
      }
    }

    static getDerivedStateFromError() {
      return { hasError: true }
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.children.type._payload?._result?.name !==
          this.props.children.type._payload?._result?.name &&
        this.state.hasError
      ) {
        this.setState({ errorHandled: true })
        window.location.reload()
      }
    }
    componentDidCatch(error, info) {
      toastr.error('Error', error.message)
      this.setState({ error })
      if (!this.state.errorHandled) {
        this.setState({ errorHandled: true })
        onError(error, info)
      }
    }

    render() {
      const { hasError, error } = this.state
      if (hasError) {
        return (
          <MainLayout>
            <div style={{ paddingTop: '100px', textAlign: 'center' }}>
              <h3>Oops! Something Went Wrong..</h3>
              <p>{error.message}</p>
              <p className='text-muted'>
                <center>
                  <button
                    className='bg-purple-500 text-white py-2 px-8 border transform transition duration-200 rounded-md hover:scale-105 mt-5'
                    onClick={() => window.location.reload()}
                  >
                    Try again
                  </button>
                </center>
              </p>
            </div>
          </MainLayout>
        )
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
export default withErrorBoundary
