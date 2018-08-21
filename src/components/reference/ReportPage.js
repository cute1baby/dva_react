//----------------------------------------------------
// 作者:高志强
// 功能描述：开发报告
// 使用模块：文档管理
// 创建时间:2018/6/12
// ---------------------修改记录-----------------------
// 修改人      修改日期        修改目的
//
//----------------------------------------------------
import React,{Component} from 'react';
import { connect } from 'dva';
import {Table, Breadcrumb, message, Row, Col, Select, Button, Input, Form, InputNumber, DatePicker, Collapse, Upload, Icon } from 'antd';
import OperatingGroup from '../../components/drd/OperatingGroup';
const FormItem = Form.Item;
const Option = Select.Option;
const Column = Table.Column;
const {TextArea} = Input;
const Panel = Collapse.Panel;

let bugMark = '';
class ReportPage extends Component{
    state = {
        //自测总结
        selfTestSummary:[
            {}
        ],
        //版本故障统计
        versionFailure:[
            {}
        ],
        //版本故障分布
        versionFailureDistribution:[
            {}
        ],
        //更新历史
        renewingHistory:[
            {version:'1.0',name:'高志强',updateTime:'2018-06-22',content:'创建',remarks:'没有太大改动'},
            {version:'1.1',name:'高志强',updateTime:'2018-06-22',content:'修改',remarks:'没有太大改动'},
        ],
        //配套版本
        matchingVersion:[
            {name:'【DRD】TFC062_综合分析报告支持按班级钻取（全日制）',version:'1.0',remarks:'--'},
            {name:'TFC062 综合分析报告支持按班级钻取API需求文档',version:'1.2',remarks:''},
        ],
        //新增功能
        newFunction:[
            {number:'2448',des:'用户点击学校名称可查看学校综合报告分析',status:'已完成',remarks:'这个'},
            {number:'2449',des:'用户点击班级名称可查看班级整体报告分析',status:'已完成',remarks:''},
            {number:'2450',des:'支持对校级报告及班级报告、综合整体报告进行分享',status:'已完成',remarks:''},
            {number:'2451',des:'支持分享页面进行浏览次数的统计',status:'已完成',remarks:''},
            {number:'2452',des:'支持提分策下载报告 显示综合测评及校级报告，班级报告的分享链接',status:'已完成',remarks:''},
        ],
        //优化
        optimize:[
            {number:'2215',des:'优化文件上传提示',status:'已完成',remarks:'',version:'TFC_TFC065_W_R20180621T02'}
        ],
        //bug
        bugList:[
            {version:'T01',number:'21633',des:'',status:'',remarks:''},
            {version:'T02',number:'21635',des:'【22】提分策综合测评历史数据在班级成绩情况中，学校和班级区域不能显示链接点击',status:'已解决',remarks:'高志强'},
            {version:'T02',number:'21639',des:'【22】提分策综合测评学校报告中班级成绩情况中学校不能有链接效果',status:'已解决',remarks:'高志强'},
            {version:'T02',number:'21642',des:'【22】提分策综合测评点击题目得分率中的折点，弹框中的学生数据点击加载更多链接无反应',status:'已解决',remarks:'高志强'},
            {version:'T02',number:'21643',des:'【22】提分策综合测评点击学校报告和班级报告时，在ie11浏览器下 ， 试卷讲解建议-按题号优先级模块内容显示不出来',status:'已解决',remarks:'高志强'},
            {version:'T03',number:'21673',des:'【22】提分策综合测评中点击题目得分率折点弹框查看得分学生中选择学校班级，查询结果显示全部',status:'已解决',remarks:'高志强'},
            {version:'T03',number:'21670',des:'【22】提分策综合测评中点击分享按钮，分享信息弹框中链接错误',status:'已解决',remarks:'高志强'},
        ],
        //开发进度
        devProgress:[
            {nodeName:'项目初审',estimatedTime:'2018-06-01',actualTime:'2018-06-01',des:''},
            {nodeName:'项目复审',estimatedTime:'2018-06-01',actualTime:'2018-06-01',des:''},
            {nodeName:'技术讨论会',estimatedTime:'无',actualTime:'无',des:''},
            {nodeName:'UID复审',estimatedTime:'无',actualTime:'无',des:''},
            {nodeName:'测试用例评审',estimatedTime:'2018-06-13',actualTime:'2018-06-13',des:''},
            {nodeName:'禅道任务分解',estimatedTime:'2018-06-04',actualTime:'2018-06-04',des:''},
            {nodeName:'测试用例自测/T01版本发布',estimatedTime:'2018-06-13',actualTime:'2018-06-13',des:''},
            {nodeName:'T01BUG修复/T02版本发布',estimatedTime:'2018-06-14',actualTime:'2018-06-14',des:''},
            {nodeName:'T02BUG修复/T03版本发布',estimatedTime:'2018-06-15',actualTime:'2018-06-15',des:''},
        ],
        //文档版本
        documentVersion:1.0,
        //前端构建插件
        plugIns:[],
        //开发环境
        devEnvironment:[
            {}
        ],
    }
    componentWillMount(){
        const { dispatch, match } = this.props;
        const { id } = match.params;        
        dispatch({type:'report/getReportDetail',payload:{
            reportId:id
        }})
        .then(result => {
            const { BuildPlugIn, NewDemand, OptimizeBug, Bug, DevEnvironment, ProjectProgress } = result;
            this.setState({
                plugIns: BuildPlugIn
            });
        });
    }
    //表格增加行
    tableAddRow = (stateKey, index) => {
        let arr = this.state[stateKey];
        arr.splice(index + 1, 0, {});
        this.setState({
            [stateKey]:arr,
        });
    }
    //表格删除行
    tableDeleteRow = (stateKey, index) => {
        let arr = this.state[stateKey];
        arr.splice(index,1);
        this.setState({
            [stateKey]:arr,
        });
    }
    //表格编辑行内容
    tableEditRow = (stateKey, index, rowKey, content) => {
        let arr = this.state[stateKey];
        arr[index][rowKey] = content;
        this.state[stateKey] = arr;
    }
    render(){
        const { selfTestSummary, versionFailure, versionFailureDistribution, renewingHistory, matchingVersion, newFunction, optimize, bugList, devProgress, devEnvironment, plugIns } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const { getFieldDecorator } = this.props.form;        
        return (
            <div>
                <Breadcrumb className="g-breadcrumb">
                    <Breadcrumb.Item>文档管理</Breadcrumb.Item>
                    <Breadcrumb.Item>生成报告</Breadcrumb.Item>
                </Breadcrumb>
                <div className="mt-l g-bd" >
                    <Form>
                        <FormItem {...formItemLayout} label="选择项目" >
                            {getFieldDecorator('project', {                                
                                rules: [
                                    {required: true, message: '请选择项目!'}
                                ],
                            })(
                                <Select placeholder="请选择" >
                                    <Option value="male">tfc</Option>
                                    <Option value="female">mtk</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="版本号" >
                            {getFieldDecorator('banben', {
                                rules: [
                                    {required: true, message: '请选择版本号!'}
                                ],
                            })(
                                <Select placeholder="请选择" >
                                    <Option value="male">tfc</Option>
                                    <Option value="female">mtk</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="测试建议" >
                            {getFieldDecorator('testDes')(
                                <TextArea rows={4} placeholder="请输入测试建议" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="自测总结" >
                            <Table rowKey="Id" dataSource={selfTestSummary} pagination={false} size='small' >
                                <Column
                                    title="测试版本号"
                                    dataIndex="version"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('selfTestSummary',index,'version',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="是否自测完成"
                                    dataIndex="des"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('selfTestSummary',index,'des',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="自测通过率"
                                    dataIndex="lv"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('selfTestSummary',index,'lv',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="自测文档链接"
                                    dataIndex="comment"
                                    render={(text,record,index)=>{
                                        const obj = {
                                            children: (
                                                <Input
                                                    defaultValue={text}
                                                    placeholder="请输入"
                                                    onChange={e => this.tableEditRow('selfTestSummary',index,'comment',e.target.value)}
                                                />
                                            ),
                                            props: {},
                                        };
                                        if(index === 0){
                                            obj.props.rowSpan = selfTestSummary.length;
                                        }else{
                                            obj.props.rowSpan = 0;
                                        }
                                        return obj;
                                    }}
                                />
                                <Column
                                    title="操作"
                                    dataIndex="action"
                                    width={80}
                                    render={(text,record,index)=>{
                                        return <OperatingGroup
                                                    actions={[
                                                        {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                            this.tableAddRow('selfTestSummary',index);
                                                        }},
                                                        {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                            this.tableDeleteRow('selfTestSummary',index);
                                                        }},
                                                    ]}
                                                />
                                    }}
                                />
                            </Table>
                        </FormItem>
                        <FormItem {...formItemLayout} label="版本故障统计" >
                            <Table rowKey="Id" dataSource={versionFailure} pagination={false} size='small' >
                                <Column
                                    title="版本"
                                    dataIndex="version"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailure',index,'version',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="Bug总数"
                                    dataIndex="des"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailure',index,'des',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="单元测试可解决"
                                    dataIndex="a1"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailure',index,'a1',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="自测不充分"
                                    dataIndex="a2"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailure',index,'a2',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="自测用例未覆盖"
                                    dataIndex="a3"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailure',index,'a3',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="设计如此"
                                    dataIndex="a4"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailure',index,'a4',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="数据问题"
                                    dataIndex="a5"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailure',index,'a5',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="操作"
                                    dataIndex="action"
                                    width={80}
                                    render={(text,record,index)=>{
                                        return <OperatingGroup
                                                    actions={[
                                                        {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                            this.tableAddRow('versionFailure',index);
                                                        }},
                                                        {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                            this.tableDeleteRow('versionFailure',index);
                                                        }},
                                                    ]}
                                                />
                                    }}
                                />
                            </Table>
                        </FormItem>
                        <FormItem {...formItemLayout} label="版本故障分布" >
                            <Table rowKey="Id" dataSource={versionFailureDistribution} pagination={false} size='small' >
                                <Column
                                    title="模块"
                                    dataIndex="version"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailureDistribution',index,'version',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="Bug数量"
                                    dataIndex="des"
                                    render={(text,record,index)=>{
                                        return (
                                            <Input
                                                defaultValue={text}
                                                placeholder="请输入"
                                                onChange={e => this.tableEditRow('versionFailureDistribution',index,'des',e.target.value)}
                                            />
                                        )
                                    }}
                                />
                                <Column
                                    title="操作"
                                    dataIndex="action"
                                    width={80}
                                    render={(text,record,index)=>{
                                        return <OperatingGroup
                                                    actions={[
                                                        {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                            this.tableAddRow('versionFailureDistribution',index);
                                                        }},
                                                        {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                            this.tableDeleteRow('versionFailureDistribution',index);
                                                        }},
                                                    ]}
                                                />
                                    }}
                                />
                            </Table>
                        </FormItem>
                        <FormItem {...formItemLayout} label="开发总结" >
                            {getFieldDecorator('testDes')(
                                <TextArea rows={4} placeholder="请输入开发总结" />
                            )}
                        </FormItem>
                        <Collapse bordered={false}  defaultActiveKey={['1']}>
                            <Panel header="自动生成部分（根据实际情况修改）" key={1}>
                                <FormItem {...formItemLayout} label="文档版本" >
                                    {getFieldDecorator('wendangbanben', {
                                        initialValue: 1.0,
                                        rules: [
                                            {required: true, message: '请输入文档版本!'}
                                        ],
                                    })(
                                        <InputNumber placeholder="请输入" min={0} step={0.1}  />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="更新历史" >
                                    <Table rowKey="version" dataSource={renewingHistory} pagination={false} size='small' >
                                        <Column
                                            title="版本"
                                            dataIndex="version"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('renewingHistory',index,'version',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="更新人"
                                            dataIndex="name"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('renewingHistory',index,'name',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="更新时间"
                                            dataIndex="updateTime"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('renewingHistory',index,'updateTime',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="更新内容"
                                            dataIndex="content"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('renewingHistory',index,'content',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="备注"
                                            dataIndex="remarks"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('renewingHistory',index,'remarks',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('renewingHistory',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('renewingHistory',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                                <FormItem {...formItemLayout} label="配套版本" >
                                    <Table rowKey="name" dataSource={matchingVersion} pagination={false} size='small' >
                                        <Column
                                            title="配套名称"
                                            dataIndex="name"
                                            width="50%"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('matchingVersion',index,'name',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="版本号"
                                            dataIndex="version"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('matchingVersion',index,'version',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="备注"
                                            dataIndex="remarks"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('matchingVersion',index,'remarks',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('matchingVersion',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('matchingVersion',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                                <FormItem {...formItemLayout} label="前端构建插件" >
                                    <Table rowKey="PlugInName" dataSource={plugIns} pagination={false} size='small' >
                                        <Column
                                            title="插件名称"
                                            dataIndex="PlugInName"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('plugIns',index,'PlugInName',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="版本号"
                                            dataIndex="Version"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('plugIns',index,'Version',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="备注"
                                            dataIndex="Remark"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('plugIns',index,'Remark',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('plugIns',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('plugIns',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                                <FormItem {...formItemLayout} label="新增功能/需求" >
                                    <Table rowKey="number" dataSource={newFunction} pagination={false} size='small' >
                                        <Column
                                            title="需求编号"
                                            dataIndex="number"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('newFunction',index,'number',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="描述"
                                            dataIndex="des"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('newFunction',index,'des',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="状态"
                                            dataIndex="status"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('newFunction',index,'status',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="备注"
                                            dataIndex="remarks"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('newFunction',index,'remarks',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('newFunction',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('newFunction',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                                <FormItem {...formItemLayout} label="优化" >
                                    <Table rowKey="Id" dataSource={optimize} pagination={false} size='small' >
                                        <Column
                                            title="优化编号"
                                            dataIndex="number"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('optimize',index,'number',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="描述"
                                            dataIndex="des"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('optimize',index,'des',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="状态"
                                            dataIndex="status"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('optimize',index,'status',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="备注"
                                            dataIndex="remarks"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('optimize',index,'remarks',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="关联版本"
                                            dataIndex="version"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('optimize',index,'version',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('optimize',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('optimize',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                                <FormItem {...formItemLayout} label="BUG" >
                                    <Table rowKey="Id" dataSource={bugList} pagination={false} size='small' >
                                        <Column
                                            title="发布版本"
                                            dataIndex="version"
                                            width={65}
                                            render={(text,record,index)=>{                                                
                                                const obj = {
                                                    children: <span style={{fontWeight:700,fontSize:16}}>{text}</span>,
                                                    props: {},
                                                };
                                                //每隔N个为一个版本
                                                if(bugMark != text){
                                                    bugMark = text;
                                                    let num = bugList.filter(obj => {
                                                            return obj.version === text
                                                        }).length;
                                                    obj.props.rowSpan = num;
                                                }else{
                                                    obj.props.rowSpan = 0;
                                                }
                                                return obj;
                                            }}
                                        />
                                        <Column
                                            title="BUG编号"
                                            dataIndex="number"
                                            width={80}
                                            render={(text,record,index)=>{                                                
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('bugList',index,'number',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="描述"
                                            dataIndex="des"
                                            width="50%"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('bugList',index,'des',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="状态"
                                            dataIndex="status"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('bugList',index,'status',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="备注"
                                            dataIndex="remarks"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('bugList',index,'remarks',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('bugList',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('bugList',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                                <FormItem {...formItemLayout} label="开发环境" >
                                    <Table rowKey="Id" dataSource={devEnvironment} pagination={false} size='small' >
                                        <Column
                                            title="节点"
                                            dataIndex="version"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('devEnvironment',index,'version',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="服务器"
                                            dataIndex="des"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('devEnvironment',index,'des',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="备注"
                                            dataIndex="comment"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('devEnvironment',index,'comment',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('devEnvironment',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('devEnvironment',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                                <FormItem {...formItemLayout} label="开发进度" >
                                    <Table rowKey="Id" dataSource={devProgress} pagination={false} size='small' >
                                        <Column
                                            title="节点名称"
                                            dataIndex="nodeName"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('devProgress',index,'nodeName',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="预计完成时间"
                                            dataIndex="estimatedTime"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('devProgress',index,'estimatedTime',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="实际完成时间"
                                            dataIndex="actualTime"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('devProgress',index,'actualTime',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="说明"
                                            dataIndex="des"
                                            render={(text,record,index)=>{
                                                return (
                                                    <Input
                                                        defaultValue={text}
                                                        placeholder="请输入"
                                                        onChange={e => this.tableEditRow('devProgress',index,'des',e.target.value)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Column
                                            title="操作"
                                            dataIndex="action"
                                            width={80}
                                            render={(text,record,index)=>{
                                                return <OperatingGroup
                                                            actions={[
                                                                {title:'向下增加一行', icon:'plus', onClick:()=>{
                                                                    this.tableAddRow('devProgress',index);
                                                                }},
                                                                {title:'删除', icon:'delete', isPopconfirm:true, popTitle:'确定删除吗？', onClick:()=>{
                                                                    this.tableDeleteRow('devProgress',index);
                                                                }},
                                                            ]}
                                                        />
                                            }}
                                        />
                                    </Table>
                                </FormItem>
                            </Panel>
                        </Collapse>
                    </Form>
                    <Row gutter={10} className="mtb-l">
                        <Col offset={4} span={12}>
                            <Button type="primary">保存</Button>
                            <Button className="ml-m" type="primary">生成文档</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      
    }
}
export default connect(mapStateToProps)(Form.create()(ReportPage));
