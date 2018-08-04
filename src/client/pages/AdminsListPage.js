

import React from 'react'
import { connect } from 'react-redux'
import { fetchAdmins } from '../actions'
import requireAuth from '../components/hocs/requireAuth'
class AdminsList extends React.Component {

    componentDidMount() {
        this.props.fetchAdmins()
    }

    renderUsers() {
        return this.props.admins.map(({id, name}) => {
            return <li key={id}>{name}</li>
        })
    }
    render() {
        return(
            <div>
                Heres a blg list of admins
                {this.renderUsers()}
            </div>
        )
    }

}
 function loadData(store) {
  return store.dispatch(fetchAdmins())
}

function mapStateToProps({admins}) {
    return { admins}
}

export default {
    component:connect(mapStateToProps,{fetchAdmins})(requireAuth(AdminsList)),
    loadData
}