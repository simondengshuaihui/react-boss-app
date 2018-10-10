import React from "react";
import PropTypes from "prop-types";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
  constructor(props){
    super(props)
}
  static propTypes = {
    userlist: PropTypes.array.isRequired
  };
  handleClick(v) {
    console.log("跳转到聊天页面", v);
    this.props.history.push(`/chat/${v._id}`);
  }
  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank style={{ marginBottom: 60 }}>
        <WhiteSpace />
        {this.props.userlist.map(
          v =>
            v.avatar ? (
              <Card
                key={v._id}
                onClick={()=>this.handleClick(v)}
                style={{zIndex:'100'}}
              >
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Body>
                  {v.type === "boss" ? (
                    <div>
                      公司:
                      {v.company}
                    </div>
                  ) : null}
                  {v.desc.split("\n").map(d => (
                    <div key={d}>{d}</div>
                  ))}
                  {v.type === "boss" ? (
                    <div>
                      薪资:
                      {v.money}
                    </div>
                  ) : null}
                </Body>
              </Card>
            ) : null
        )}
      </WingBlank>
    );
  }
}

export default UserCard;
