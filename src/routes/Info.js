import React,{Component} from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Breadcrumb, Card, Col, Row,Icon,Avatar,Button} from 'antd';
const FormItem = Form.Item,
	  Option = Select.Option,
	  { Meta } = Card;
@connect(({ person }) => ({
	person
}))
@Form.create()
export default class Info extends Component{
	state = {
		productList:[]
	}
	componentWillMount(){
		const {dispatch} = this.props;
		dispatch({
			type:'person/queryPerson',
			payload:{
				pId:1
			}
		}).then((res) => {
			this.setState({ productList: res.data.ReturnEntity.getEveryCon});
		});
	}
	handleSelect = (val) => {
		alert(val);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
  render(){
	const {productList} = this.state;
	const { getFieldDecorator } = this.props.form;
	const formItemLayout = {
		labelCol: {
		  xs: { span: 12 },
		  sm: { span: 4 },
		},
		wrapperCol: {
		  xs: { span: 24 },
		  sm: { span: 16 },
		},
	};
	const tailFormItemLayout = {
		wrapperCol: {
		  xs: {
			span: 24,
			offset: 0,
		  },
		  sm: {
			span: 16,
			offset: 4,
		  },
		},
	};
	const gridStyle = {
		width: '33.3%',
		textAlign: 'center',
	  };
    return (
		<div className="mt-l g-bd" >
			<Form className="infoContent" onSubmit={this.handleSubmit}>
				<Breadcrumb style={{padding: '0 0 20px 20px'}}>
					<Breadcrumb.Item><a href="">Home</a></Breadcrumb.Item>
					<Breadcrumb.Item>Application</Breadcrumb.Item>
				</Breadcrumb>
				<FormItem label="标题" {...formItemLayout}>
					{getFieldDecorator('title', {                                
						rules: [
							{required: true, message: '请设置标题名称!'}
						],
					})(
						<Input placeholder="标题名称"/>
					)}
				</FormItem>
				<FormItem label="选择人物" {...formItemLayout}>
					<Select placeholder="请选择人物" onSelect={this.handleSelect}>
						{productList.map((item, i) => {
							return <Option key={item.id} >{item.name}</Option>
						})}
					</Select>
				</FormItem>
				<FormItem {...tailFormItemLayout}>
					<Button
						type="primary"
						htmlType="submit"
					>
						登录
					</Button>
				</FormItem>
			</Form>				
			<Row gutter={24} className="setting">
				<Col span={4}>
					<Card title="Card title" 
						  hoverable
						  cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
					>
						<Meta description="www.instagram.com"/>
					</Card>
				</Col>
				<Col span={4}>
					<Card title="Card title" hoverable
						  cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
						  actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
					>
						<Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							  title="Card title"
							  description="This is the description"
						>
						
						</Meta>
					</Card>
				</Col>
				<Col span={16} className="split">
					<Card>
						<Card.Grid style={gridStyle}>
							<Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title="Card title"
								description="This is the description"
							>
							</Meta>
							<div className="projectItemContent___2M3Iz">
								<a href="#/">科学搬砖组</a>
								<span className="datetime___35Apf" title="Fri Aug 17 2018 15:32:09 GMT+0800 (中国标准时间)">19 分钟前</span>
							</div>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							<Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title="Card title"
								description="This is the description"
							>
							</Meta>
							<div className="projectItemContent___2M3Iz">
								<a href="#/">科学搬砖组</a>
								<span className="datetime___35Apf" title="Fri Aug 17 2018 15:32:09 GMT+0800 (中国标准时间)">19 分钟前</span>
							</div>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							<Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title="Card title"
								description="This is the description"
							>
							</Meta>
							<div className="projectItemContent___2M3Iz">
								<a href="#/">科学搬砖组</a>
								<span className="datetime___35Apf" title="Fri Aug 17 2018 15:32:09 GMT+0800 (中国标准时间)">19 分钟前</span>
							</div>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							<Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title="Card title"
								description="This is the description"
							>
							</Meta>
							<div className="projectItemContent___2M3Iz">
								<a href="#/">科学搬砖组</a>
								<span className="datetime___35Apf" title="Fri Aug 17 2018 15:32:09 GMT+0800 (中国标准时间)">19 分钟前</span>
							</div>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							<Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title="Card title"
								description="This is the description"
							>
							</Meta>
							<div className="projectItemContent___2M3Iz">
								<a className="#/">科学搬砖组</a>
								<span className="datetime___35Apf" title="Fri Aug 17 2018 15:32:09 GMT+0800 (中国标准时间)">19 分钟前</span>
							</div>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							<Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title="Card title"
								description="This is the description"
							>
							</Meta>
							<div className="projectItemContent___2M3Iz">
								<a href="#/">科学搬砖组</a>
								<span className="datetime___35Apf" title="Fri Aug 17 2018 15:32:09 GMT+0800 (中国标准时间)">19 分钟前</span>
							</div>
						</Card.Grid>
					</Card>
				</Col>
			</Row>
		</div>	
    )
  }
}