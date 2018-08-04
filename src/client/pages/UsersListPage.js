import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'
import { Helmet } from 'react-helmet'

class UsersList extends React.Component {

    componentDidMount() {
        this.props.fetchUsers()
    }

    renderUsers() {
        return this.props.users.map(({id, name}) => {
            return <li key={id}>{name}</li>
        })
    }
    render() {
        return(
            <div>
                <Helmet>
                  <title>Users App</title>
                  <meta property="og:title" content="Users App" />
                </Helmet>
                Heres a blg list of users
                {this.renderUsers()}
            </div>
        )
    }

}
 function loadData(store) {
  return store.dispatch(fetchUsers())
}

function mapStateToProps({users}) {
    return { users}
}

export default {
    component:connect(mapStateToProps,{fetchUsers})(UsersList),
    loadData
}