const Organ = artifacts.require('Organ.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('Organ', (accounts) => {
    let organ

    beforeEach(async () => {
        organ = await Organ.new()
        await organ.addSigner(accounts[1])
        await organ.addSigner(accounts[2])
        await organ.addSigner(accounts[3])

        await organ.addOpo(accounts[4])

    })

    describe('Organ Submissions', () => {
        let tx
        it('should let the OPO submit an organ', async () => {
            await organ.submitOrgan({ from: accounts[0] }).should.be.rejected
            await organ.submitOrgan({ from: accounts[4] }).should.be.fulfilled
        })
        it('should emit correct logs', async () => {
            tx = await organ.submitOrgan({ from: accounts[4] }).should.be.fulfilled
            tx.logs[0].event.should.be.equal('Submission')
        })
        it('should only let signers sign a pending submission', async () => {
            await organ.submitOrgan({ from: accounts[4] })
            await organ.signSubmission(0, { from: accounts[1]}).should.be.fulfilled
            await organ.signSubmission(0, { from: accounts[2]}).should.be.fulfilled
            await organ.signSubmission(0, { from: accounts[4]}).should.be.rejected
            tx = await organ.signSubmission(0, { from: accounts[3]}).should.be.fulfilled

            tx.logs[0].event.should.be.equal('Sign')
            tx.logs[1].event.should.be.equal('SubmissionFinished')

            await organ.signSubmission(0, { from: accounts[2]}).should.be.rejected
        })
    })
})