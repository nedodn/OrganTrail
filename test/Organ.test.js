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
            await organ.submitOrgan(accounts[5], 'A', 12, { from: accounts[0] }).should.be.rejected
            await organ.submitOrgan(accounts[5], 'A', 12, { from: accounts[4] }).should.be.fulfilled
        })
        it('should emit correct logs', async () => {
            tx = await organ.submitOrgan(accounts[5], 'A', 12, { from: accounts[4] }).should.be.fulfilled
            tx.logs[0].event.should.be.equal('Submission')
        })
        it('should only let signers sign a pending submission', async () => {
            await organ.submitOrgan(accounts[5], 'A', 12, { from: accounts[4] })
            await organ.signSubmission(0, { from: accounts[1]}).should.be.fulfilled
            await organ.signSubmission(0, { from: accounts[2]}).should.be.fulfilled
            await organ.signSubmission(0, { from: accounts[4]}).should.be.rejected
            tx = await organ.signSubmission(0, { from: accounts[3]}).should.be.fulfilled

            tx.logs[0].event.should.be.equal('Sign')
            tx.logs[1].event.should.be.equal('SubmissionFinished')

            await organ.signSubmission(0, { from: accounts[2]}).should.be.rejected
        })
    })

    describe('Organ Minting', () => {
        let tx
        beforeEach(async () => {
            await organ.submitOrgan(accounts[5], 'A', 12, { from: accounts[4] })
        })

        it('should not let you mint without all signatures', async () => {
            await organ.signSubmission(0, { from: accounts[1]}).should.be.fulfilled
            await organ.mintOrgan(0, accounts[6], 3, { from: accounts[4] } ).should.be.rejected
            await organ.signSubmission(0, { from: accounts[2]}).should.be.fulfilled
            await organ.mintOrgan(0, accounts[6], 3, { from: accounts[4] } ).should.be.rejected
            await organ.signSubmission(0, { from: accounts[3]}).should.be.fulfilled
            await organ.mintOrgan(0, accounts[6], 3, { from: accounts[3] } ).should.be.rejected
            let tx = await organ.mintOrgan(0, accounts[6], 3, { from: accounts[4] } ).should.be.fulfilled
            tx.logs[0].event.should.be.equal('Transfer')
            tx.logs[1].event.should.be.equal('OrganMinted')
        })
    })

    describe('Organ Transfers', () => {
        beforeEach(async () => {
            await organ.submitOrgan(accounts[5], 'A', 12, { from: accounts[4] })

            await organ.signSubmission(0, { from: accounts[1]})
            await organ.signSubmission(0, { from: accounts[2]})
            await organ.signSubmission(0, { from: accounts[3]})

            await organ.mintOrgan(0, accounts[6], 3, { from: accounts[4] } )
        })
        let tx

        it('should only allow 2 party transfers to the approved', async () => {
            await organ._transferFrom(accounts[4], accounts[6], 0, 32, { from: accounts[4] }).should.be.rejected
            await organ.approve(accounts[7], 0, { from: accounts[4] }).should.be.fulfilled
            await organ._transferFrom(accounts[4], accounts[7], 0, 32, { from: accounts[7] }).should.be.fulfilled

            await organ.approve(accounts[6], 0, { from: accounts[7] }).should.be.fulfilled
            let tx = await organ._transferFrom(accounts[7], accounts[6], 0, 32, { from: accounts[6] }).should.be.fulfilled

            tx.logs[0].event.should.be.equal('Approval')
            tx.logs[1].event.should.be.equal('Transfer')
            tx.logs[2].event.should.be.equal('Delivered')
        })

    })
})