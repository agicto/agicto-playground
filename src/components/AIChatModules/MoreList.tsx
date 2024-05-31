// @ts-nocheck
import { Modal } from "antd"

const MoreList = ({ moreOpen, setMoreOpen, vipLevel }) => {
  return <Modal centered title="温馨提示" open={moreOpen} onOk={() => setMoreOpen(false)} onCancel={() => setMoreOpen(false)}>
    <div className="flex">
      <i className="xijing xijingbg-warning text-[#FAAD14] mr-2"></i>
      <div>
        {vipLevel == 0 && "您当前为普通会员，普通会员最多支持创建5个会话。如您需要更多会话窗口，可以通过升级会员等级获取更多权限。"}
        {vipLevel == 1 && "您当前为初级会员，初级会员最多支持创建20个会话。如您需要更多会话窗口，可以通过升级会员等级获取更多权限。"}
      </div>
    </div>
  </Modal>
}

export default MoreList